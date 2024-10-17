import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextProvider from "./contexts/ContextProvider";
const { default: AppLayout } = require("./components/AppLayout");

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AppLayout />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
