export interface ApiResponse<T> {
  data?: T
  status: number
  message?: string
  errors?: string[]
}
