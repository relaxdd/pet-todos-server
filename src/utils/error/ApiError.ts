class ApiError extends Error {
  public status: number
  public data: Record<string, any> | undefined

  constructor(message: string, status: number, data?: Record<string, any> & { error?: string }) {
    super(message)

    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

export default ApiError
