import java.net.URISyntaxException;

import io.socket.client.IO;
import io.socket.client.Socket;
import io.socket.emitter.Emitter;

public class SocketIO {
    private static Socket socket;

    public static void main(String[] args) throws URISyntaxException {
        socket = IO.socket("http://localhost:2222");

        socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                System.out.println("Connected!");
            }

        });

        socket.connect();
    }
}
