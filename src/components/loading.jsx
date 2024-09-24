import { Loader2 } from 'lucide-react'
const Loading = () => {
  return (
    <div className="flex items-center justify-center space-x-3 w-full ">
        <p className="text-sm text-neutral-500">Loading data...</p>
        <Loader2 className="animate-spin h-4" />
      </div>
  )
}

export default Loading