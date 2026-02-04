export interface AuditEvent {
  actorId: string | null;
  action: string;
  metadata?: Record<string, unknown>;
  occurredAt?: Date;
}

export function logAuditEvent(event: AuditEvent): void {
  const payload = {
    ...event,
    occurredAt: event.occurredAt ?? new Date()
  };

  // In production, persist to a dedicated audit log store.
  // This console log is a placeholder for demo mode.
  console.info("[AUDIT]", JSON.stringify(payload));
}
