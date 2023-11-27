export interface UpdateAccessToken {
  updateAccessToken: (id: number, token: string) => Promise<void>
}
