import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ContextProvider from "./contexts/ContextProvider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const { default: AppLayout } = require("./components/AppLayout");

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <AppLayout />
      <ReactQueryDevtools initialIsOpen={false} />
      </ContextProvider>
    </QueryClientProvider>
  );
}

export default App;
