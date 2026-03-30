function StatCard({ title, value, subtitle }) {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className="stat-card-value">{value}</div>
      <p className="stat-card-subtitle">{subtitle}</p>
    </div>
  )
}

export default StatCard