import { socket, SocketContext } from "./context/socket";
import { Workspace } from "./pages/Workspace";

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Workspace />
    </SocketContext.Provider>
  );
}

export { App };
