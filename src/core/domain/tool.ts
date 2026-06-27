export interface ToolManifest {
  appKey: string
  name: string
  description: string
  categoryKey: string
  iconKey: string
  entry: string
  status: 'available' | 'disabled' | 'hidden'
  link: string
  tags: string[]
  agent: {
    enabled: boolean
  }
  queue: {
    enabled: boolean
  }
}
