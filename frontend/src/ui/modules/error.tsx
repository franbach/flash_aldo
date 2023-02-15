const Error: React.FC = () => {
  return (
    <div className="flex flex-col bg-red-100 p-3 rounded-lg space-y-2">
      <h3>Please make sure you follow the steps below in this exact order.</h3>
      <p className="">1. Start the broadcaster</p>
      <p className="">2. Start the Rails server</p>
      <p className="">3. Start the frontend</p>
    </div>
  )
}

export default Error;