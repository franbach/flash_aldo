
import { store } from "@/app/redux/store";
import { Provider } from "react-redux";
import { Layout } from "@/ui/layout/app";

import { ApolloProvider } from "@apollo/client";
import { graphql } from "@/app/helpers";

const App: React.FC = () => {
  return (
    <ApolloProvider client={graphql.client}>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ApolloProvider>
  );
};

export default App
