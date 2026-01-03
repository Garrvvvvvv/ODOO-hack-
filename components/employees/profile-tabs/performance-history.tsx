"use client"

interface PerformanceHistoryProps {
  employeeId: string
}

export function PerformanceHistory({ employeeId }: PerformanceHistoryProps) {
  const reviews = [
    {
      id: 1,
      period: "2024 Q1",
      rating: 4.5,
      reviewer: "Sarah Smith",
      comments: "Excellent performance. Great communication and technical skills.",
    },
    {
      id: 2,
      period: "2023 Q4",
      rating: 4.0,
      reviewer: "Sarah Smith",
      comments: "Good work on the project. Could improve on documentation.",
    },
  ]

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-foreground mb-6">Performance History</h2>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 rounded-lg border border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-foreground">{review.period}</p>
                <p className="text-sm text-muted-foreground">Reviewed by {review.reviewer}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{review.rating}</div>
                <p className="text-xs text-muted-foreground">/ 5.0</p>
              </div>
            </div>
            <p className="text-sm text-foreground">{review.comments}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
