
import { store } from "@/app/redux/store";
import { Provider } from "react-redux";
import { Layout } from "@/ui/layout/app";

import { ApolloProvider } from "@apollo/client";
import { graphql } from "@/app/helpers";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const App: React.FC = () => {
  return (
    <ApolloProvider client={graphql.client}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <Layout />
        </Provider>
      </DndProvider>
    </ApolloProvider>
  );
};

export default App
