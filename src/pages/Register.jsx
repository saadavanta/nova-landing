import { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronRight, ChevronLeft, Upload, FileCheck2, Rocket, Phone, MessageCircle, Shield, GraduationCap, CreditCard, X, Loader2, Lock, MailCheck } from 'lucide-react';
import GradientBackground from '@/components/GradientBackground';
import { base44 } from '@/api/base44Client';
import { COURSES, ACADEMY, PAYMENT_METHODS, whatsappLink } from '@/lib/constants';

const educationLevels = ['School Student', 'College Student', 'University Student', 'Graduate', 'Beginner', 'Other'];

export default function Register() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [otpStep, setOtpStep] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpResending, setOtpResending] = useState(false);

  const preselectedCourse = searchParams.get('course');
  const [form, setForm] = useState({
    full_name: '', email: '', mobile_number: '', whatsapp_number: '', city: '', gender: '', date_of_birth: '',
    education_level: '', selected_course: preselectedCourse || '', payment_method: 'JazzCash',
    transaction_id: '', sender_mobile: '', payment_date: '', payment_notes: '', payment_screenshot: '',
    password: '', confirm_password: '',
  });
  const [courses, setCourses] = useState(COURSES);

  const selectedCourseData = courses.find((c) => c.slug === form.selected_course);

  useEffect(() => {
    if (preselectedCourse) setForm((f) => ({ ...f, selected_course: preselectedCourse }));
  }, [preselectedCourse]);

  useEffect(() => {
    base44.entities.Course.filter({ status: 'Published' }, 'display_order')
      .then((data) => { if (data && data.length) setCourses(data); })
      .catch(() => {});
  }, []);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    if (errors[field]) setErrors({ ...errors, [field]: '' });
  };

  const validateStep1 = () => {
    const e = {};
    if (!form.full_name.trim()) e.full_name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.mobile_number.trim()) e.mobile_number = 'Required';
    else if (!/^\+?[\d\s-]{10,}$/.test(form.mobile_number)) e.mobile_number = 'Invalid phone';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.education_level) e.education_level = 'Required';
    if (!form.password) e.password = 'Required';
    else if (form.password.length < 6) e.password = 'Min 6 characters';
    if (form.password !== form.confirm_password) e.confirm_password = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.selected_course) e.selected_course = 'Please select a course';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e = {};
    if (!form.payment_method) e.payment_method = 'Required';
    if (!form.sender_mobile.trim()) e.sender_mobile = 'Required';
    if (!form.payment_date) e.payment_date = 'Required';
    if (!form.payment_screenshot) e.payment_screenshot = 'Please upload payment screenshot';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setErrors({ ...errors, payment_screenshot: 'File must be under 5MB' }); return; }
    setErrors({ ...errors, payment_screenshot: '' });
    setUploadProgress(1);
    const interval = setInterval(() => setUploadProgress((p) => Math.min(p + 10, 90)), 200);
    try {
      const result = await base44.integrations.Core.UploadFile({ file });
      clearInterval(interval);
      setUploadProgress(100);
      handleChange('payment_screenshot', result.file_url);
      setTimeout(() => setUploadProgress(0), 600);
    } catch (err) {
      clearInterval(interval);
      setUploadProgress(0);
      setErrors({ ...errors, payment_screenshot: err?.message || 'Upload failed. Please try again.' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setSubmitting(true);
    try {
      // Create user account first
      await base44.auth.register({ email: form.email, password: form.password });

      // Create enrollment record (exclude password fields)
      const { password, confirm_password, ...enrollmentData } = form;
      const regId = `CN-${Date.now().toString().slice(-8)}`;
      const payload = {
        ...enrollmentData,
        course_fee: selectedCourseData?.fee || 0,
        course_duration: selectedCourseData?.duration || '',
        registration_id: regId,
        enrollment_status: 'Payment Under Review',
        payment_status: 'Under Review',
      };
      await base44.entities.Enrollment.create(payload);
      setSubmitted({ ...payload, registration_id: regId });
      setOtpStep(true);
    } catch (err) {
      if (err?.status === 409 || err?.message?.toLowerCase().includes('already') || err?.message?.toLowerCase().includes('exists')) {
        setErrors({ submit: 'This email is already registered. Please log in instead.' });
      } else {
        setErrors({ submit: err?.message || 'Registration failed. Please try again or contact us on WhatsApp.' });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) { setOtpError('Please enter the verification code'); return; }
    setOtpVerifying(true);
    setOtpError('');
    try {
      await base44.auth.verifyOtp({ email: form.email, otpCode: otpCode.trim() });
      // Login after verification to set the session token
      await base44.auth.loginViaEmailPassword(form.email, form.password);
      setOtpStep(false);
    } catch (err) {
      setOtpError(err?.message || 'Invalid or expired verification code.');
    } finally {
      setOtpVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpResending(true);
    setOtpError('');
    try {
      await base44.auth.resendOtp(form.email);
    } catch (err) {
      setOtpError('Failed to resend code. Please try again.');
    } finally {
      setOtpResending(false);
    }
  };

  if (otpStep) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        <GradientBackground />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="container-max relative px-4">
          <div className="mx-auto max-w-md glass-card-strong rounded-3xl p-8 text-center sm:p-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/30">
              <MailCheck className="h-10 w-10 text-white" />
            </motion.div>
            <h1 className="mt-6 text-2xl font-extrabold text-foreground sm:text-3xl">Verify Your Email</h1>
            <p className="mt-4 text-muted-foreground">We sent a 6-digit verification code to <span className="font-semibold text-foreground">{form.email}</span>. Enter it below to activate your account.</p>
            {otpError && <div className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{otpError}</div>}
            <div className="mt-6">
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp()}
                placeholder="Enter 6-digit code"
                className="w-full rounded-2xl border-2 border-border bg-white/80 px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] outline-none transition-all focus:border-primary"
                autoFocus
              />
            </div>
            <button onClick={handleVerifyOtp} disabled={otpVerifying || otpCode.length < 6} className="btn-primary mt-6 w-full">
              {otpVerifying ? <><Loader2 className="h-4 w-4 animate-spin" /> Verifying...</> : <><CheckCircle2 className="h-4 w-4" /> Verify & Activate</>}
            </button>
            <div className="mt-4 flex items-center justify-between text-sm">
              <button onClick={handleResendOtp} disabled={otpResending} className="font-medium text-primary hover:underline disabled:opacity-50">
                {otpResending ? 'Resending...' : 'Resend code'}
              </button>
              <button onClick={() => setOtpStep(false)} className="font-medium text-muted-foreground hover:text-foreground hover:underline">
                Skip for now
              </button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">You must verify your email to log in. If you skip now, you can verify later.</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
        <GradientBackground />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="container-max relative px-4">
          <div className="mx-auto max-w-lg glass-card-strong rounded-3xl p-8 text-center sm:p-12">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success to-accent shadow-lg shadow-success/30">
              <img src="https://media.base44.com/images/public/6a5b7bbe71e21785767a9e6d/4e89dda92_faviconico.png" alt="CodeNova Academy" className="h-14 w-14 rounded-full object-cover" />
            </motion.div>
            <h1 className="mt-6 text-2xl font-extrabold text-foreground sm:text-3xl">Thank You for Registering!</h1>
            <p className="mt-4 text-muted-foreground">Your registration has been successfully submitted. Our team will verify your payment. Once approved, your account will be activated.</p>
            <div className="mt-6 rounded-2xl bg-muted/50 p-4 text-left">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Registration ID</span><span className="font-bold text-primary">{submitted.registration_id}</span></div>
              <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Course</span><span className="font-semibold">{submitted.selected_course}</span></div>
              <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Fee</span><span className="font-semibold">PKR {submitted.course_fee?.toLocaleString()}</span></div>
              <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Status</span><span className="font-semibold text-warning">Under Review</span></div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">We will notify you using your registered email or phone number.</p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Link to="/" className="btn-secondary">Return Home</Link>
              <a href={whatsappLink(`Hello, I just registered. My Registration ID is ${submitted.registration_id}`)} target="_blank" rel="noopener noreferrer" className="btn-primary"><MessageCircle className="h-4 w-4" /> Contact WhatsApp</a>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden pt-24 pb-16">
      <GradientBackground />
      <div className="container-max relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center">
            <span className="inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-semibold text-primary">Registration</span>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">Join <span className="gradient-text">CodeNova Academy</span></h1>
          </div>

          {/* Stepper */}
          <div className="mx-auto mt-8 flex max-w-md items-center justify-center">
            {[1, 2, 3].map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${step >= s ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/30' : 'bg-muted text-muted-foreground'}`}>
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {i < 2 && <div className={`h-1 w-16 sm:w-24 ${step > s ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-muted'}`} />}
              </div>
            ))}
          </div>
          <div className="mt-2 flex max-w-md mx-auto justify-between text-xs font-medium text-muted-foreground px-0">
            <span>Personal Info</span>
            <span>Course Selection</span>
            <span>Payment</span>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="glass-card-strong rounded-3xl p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Personal Info */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><GraduationCap className="h-5 w-5 text-primary" /> Personal Information</h2>
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Field label="Full Name *" error={errors.full_name}><input className="reg-input" value={form.full_name} onChange={(e) => handleChange('full_name', e.target.value)} placeholder="John Doe" /></Field>
                        <Field label="Email Address *" error={errors.email}><input type="email" className="reg-input" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="john@example.com" /></Field>
                        <Field label="Mobile Number *" error={errors.mobile_number}><input type="tel" className="reg-input" value={form.mobile_number} onChange={(e) => handleChange('mobile_number', e.target.value)} placeholder="+92 3XX XXXXXXX" /></Field>
                        <Field label="WhatsApp Number"><input type="tel" className="reg-input" value={form.whatsapp_number} onChange={(e) => handleChange('whatsapp_number', e.target.value)} placeholder="+92 3XX XXXXXXX" /></Field>
                        <Field label="City *" error={errors.city}><input className="reg-input" value={form.city} onChange={(e) => handleChange('city', e.target.value)} placeholder="Karachi" /></Field>
                        <Field label="Gender"><select className="reg-input" value={form.gender} onChange={(e) => handleChange('gender', e.target.value)}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></Field>
                        <Field label="Date of Birth"><input type="date" className="reg-input" value={form.date_of_birth} onChange={(e) => handleChange('date_of_birth', e.target.value)} /></Field>
                        <Field label="Current Education *" error={errors.education_level}><select className="reg-input" value={form.education_level} onChange={(e) => handleChange('education_level', e.target.value)}><option value="">Select</option>{educationLevels.map((l) => <option key={l}>{l}</option>)}</select></Field>
                        <Field label="Password *" error={errors.password}><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><input type="password" className="reg-input pl-10" value={form.password} onChange={(e) => handleChange('password', e.target.value)} placeholder="Min 6 characters" /></div></Field>
                        <Field label="Confirm Password *" error={errors.confirm_password}><div className="relative"><Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><input type="password" className="reg-input pl-10" value={form.confirm_password} onChange={(e) => handleChange('confirm_password', e.target.value)} placeholder="Re-enter password" /></div></Field>
                      </div>
                      <div className="mt-6 flex justify-end">
                        <button onClick={() => validateStep1() && setStep(2)} className="btn-primary">Next <ChevronRight className="h-4 w-4" /></button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Course Selection */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><Rocket className="h-5 w-5 text-primary" /> Select Your Course</h2>
                      <div className="mt-5 space-y-3">
                        {courses.map((course) => (
                          <button key={course.slug} onClick={() => handleChange('selected_course', course.slug)} className={`flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all ${form.selected_course === course.slug ? 'border-primary bg-primary/5 shadow-md' : 'border-border bg-white hover:border-primary/30'}`}>
                            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${form.selected_course === course.slug ? 'border-primary bg-primary' : 'border-border'}`}>
                              {form.selected_course === course.slug && <CheckCircle2 className="h-4 w-4 text-white" />}
                            </div>
                            <img src={course.thumbnail} alt="" className="h-14 w-20 rounded-lg object-cover" />
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-foreground">{course.title}</div>
                              <div className="text-sm text-muted-foreground">{course.duration} • PKR {course.fee.toLocaleString()}</div>
                            </div>
                          </button>
                        ))}
                      </div>
                      {errors.selected_course && <p className="mt-2 text-sm text-destructive">{errors.selected_course}</p>}
                      <div className="mt-6 flex justify-between">
                        <button onClick={() => setStep(1)} className="btn-secondary"><ChevronLeft className="h-4 w-4" /> Back</button>
                        <button onClick={() => validateStep2() && setStep(3)} className="btn-primary">Next <ChevronRight className="h-4 w-4" /></button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <h2 className="flex items-center gap-2 text-xl font-bold text-foreground"><CreditCard className="h-5 w-5 text-primary" /> Payment Instructions</h2>

                      {/* Payment summary */}
                      {selectedCourseData && (
                        <div className="mt-5 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 p-5">
                          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Payment Summary</h3>
                          <div className="mt-3 space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-muted-foreground">Course</span><span className="font-semibold">{selectedCourseData.title}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="font-semibold">{selectedCourseData.duration}</span></div>
                            <div className="flex justify-between border-t border-border pt-2"><span className="text-muted-foreground">Total Fee</span><span className="text-lg font-extrabold gradient-text-blue">PKR {selectedCourseData.fee.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-muted-foreground">Status</span><span className="font-semibold text-warning">Pending</span></div>
                          </div>
                        </div>
                      )}

                      {/* Payment methods */}
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {Object.values(PAYMENT_METHODS).map((method) => (
                          <button key={method.name} onClick={() => handleChange('payment_method', method.name)} className={`rounded-2xl border-2 p-4 text-left transition-all ${form.payment_method === method.name ? 'border-primary bg-primary/5' : 'border-border bg-white'}`}>
                            <div className="font-bold text-foreground">{method.name}</div>
                            <div className="mt-1 text-sm text-muted-foreground">{method.number}</div>
                            <div className="text-xs text-muted-foreground">{method.accountName}</div>
                          </button>
                        ))}
                      </div>

                      <p className="mt-4 rounded-xl bg-warning/10 p-3 text-sm text-foreground">
                        Send <strong>PKR {selectedCourseData?.fee.toLocaleString()}</strong> to the {form.payment_method} number above, then upload your payment screenshot below.
                      </p>

                      {/* Transaction details */}
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        <Field label="Transaction ID"><input className="reg-input" value={form.transaction_id} onChange={(e) => handleChange('transaction_id', e.target.value)} placeholder="Optional" /></Field>
                        <Field label="Sender Mobile Number *" error={errors.sender_mobile}><input type="tel" className="reg-input" value={form.sender_mobile} onChange={(e) => handleChange('sender_mobile', e.target.value)} placeholder="Your JazzCash/Easypaisa number" /></Field>
                        <Field label="Payment Date *" error={errors.payment_date}><input type="date" className="reg-input" value={form.payment_date} onChange={(e) => handleChange('payment_date', e.target.value)} /></Field>
                        <Field label="Notes"><input className="reg-input" value={form.payment_notes} onChange={(e) => handleChange('payment_notes', e.target.value)} placeholder="Optional" /></Field>
                      </div>

                      {/* File upload */}
                      <div className="mt-4">
                        <label className="mb-1.5 block text-sm font-semibold text-foreground">Payment Screenshot *</label>
                        {form.payment_screenshot && uploadProgress === 0 ? (
                          <div className="relative rounded-2xl border-2 border-success/30 bg-success/5 p-4">
                            <div className="flex items-center gap-3">
                              <FileCheck2 className="h-8 w-8 text-success" />
                              <div className="flex-1"><div className="text-sm font-semibold text-foreground">Screenshot uploaded</div><div className="text-xs text-muted-foreground">Click to replace</div></div>
                              <button onClick={() => handleChange('payment_screenshot', '')} className="text-muted-foreground hover:text-destructive"><X className="h-5 w-5" /></button>
                            </div>
                            {form.payment_screenshot.match(/\.(jpg|jpeg|png|webp)$/i) && (
                              <img src={form.payment_screenshot} alt="Payment proof" className="mt-3 max-h-40 rounded-lg object-contain" />
                            )}
                            <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/20 bg-white px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/5">
                              <Upload className="h-4 w-4" /> Replace Screenshot
                              <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => { const f = e.target.files[0]; if (f) handleFileUpload(f); e.target.value = ''; }} />
                            </label>
                          </div>
                        ) : uploadProgress > 0 ? (
                          <div className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-primary/40 bg-primary/5 p-8 text-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <span className="mt-2 text-sm text-muted-foreground">Uploading... {uploadProgress}%</span>
                          </div>
                        ) : (
                          <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-white p-8 text-center transition-all hover:border-primary hover:bg-primary/5">
                            <Upload className="h-8 w-8 text-muted-foreground" />
                            <span className="mt-2 text-sm font-semibold text-foreground">Click to upload screenshot</span>
                            <span className="text-xs text-muted-foreground">JPG, PNG, JPEG, PDF — Max 5MB</span>
                            <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => { const f = e.target.files[0]; if (f) handleFileUpload(f); e.target.value = ''; }} />
                          </label>
                        )}
                        {errors.payment_screenshot && <p className="mt-1 text-xs text-destructive">{errors.payment_screenshot}</p>}
                      </div>

                      {errors.submit && <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">{errors.submit}</p>}

                      <div className="mt-6 flex justify-between">
                        <button onClick={() => setStep(2)} className="btn-secondary"><ChevronLeft className="h-4 w-4" /> Back</button>
                        <button onClick={handleSubmit} disabled={submitting} className="btn-primary">
                          {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting...</> : <><CheckCircle2 className="h-4 w-4" /> Submit Registration</>}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar — Support */}
            <div className="space-y-4">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="flex items-center gap-2 font-bold text-foreground"><Shield className="h-5 w-5 text-primary" /> Need Help?</h3>
                <p className="mt-2 text-sm text-muted-foreground">Our support team is here to help you with registration.</p>
                <div className="mt-4 space-y-2">
                  <a href={whatsappLink('Hello, I need help with registration')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl border border-border bg-white p-3 text-sm font-medium transition-all hover:bg-success/5 hover:border-success">
                    <MessageCircle className="h-4 w-4 text-success" /> WhatsApp
                  </a>
                  <a href={`tel:${ACADEMY.phone}`} className="flex items-center gap-2 rounded-xl border border-border bg-white p-3 text-sm font-medium transition-all hover:bg-primary/5 hover:border-primary">
                    <Phone className="h-4 w-4 text-primary" /> {ACADEMY.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-bold text-foreground">Why Join Us?</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {['Live interactive classes', 'Real-world projects', 'Career guidance & support', 'Professional certificate', 'Affordable fees', 'Small batch learning'].map((item) => (
                    <li key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-semibold text-primary hover:underline">Login here</Link>
          </p>
        </div>
      </div>

      <style>{`
        .reg-input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid hsl(var(--border));
          background: rgba(255,255,255,0.8);
          padding: 0.625rem 1rem;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .reg-input:focus { border-color: hsl(var(--primary)); box-shadow: 0 0 0 3px hsl(var(--primary) / 0.12); }
        .reg-input::placeholder { color: hsl(var(--muted-foreground) / 0.5); }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-foreground">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}