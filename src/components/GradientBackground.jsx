export default function GradientBackground({ variant = 'mesh', className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {variant === 'mesh' && <div className="absolute inset-0 gradient-mesh" />}
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl animate-blob" />
      <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-secondary/10 blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute -bottom-24 left-1/3 h-96 w-96 rounded-full bg-accent/10 blur-3xl animate-blob animation-delay-4000" />
    </div>
  );
}