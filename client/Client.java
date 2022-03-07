import java.net.*;
import java.io.*;


public class client {
    private Socket clientSocket;
    private DataInputStream input;
    private DataOutputStream out;

        public client(String address, int port)
        {
            try 
            {
                clientSocket = new Socket (address , port);
                System.out.println("Connected");
                
                // take input from terminal
                input = new DataInputStream(System.in);
                //newly inserted to see read data ( TBC)
                int dataInt = input.readInt();
                String dataString = input.readUTF();
                Boolean dataBool = input.readBoolean();

                //send output to socket
                out = new DataOutputStream(clientSocket.getOutputStream());
                //Sending Sample output (TBC)
                out.writeInt(2);
                out.writeUTF("testing");
                out.writeBoolean(true);
            }
            catch(UnknownHostException u)
            {
                System.out.println(u);
            }
            catch(IOException i)
            {
                System.out.println(i);
            }

            // string to read input from input tab
            String line ="";

            //keep read until "Over" is displayed on screen
            while (!line.equals("Over"))
            {
                try 
                {
                    line = input.readLine();
                    out.writeUTF(line);
                }
                catch (IOException i)
                {
                    System.out.println(i);
                }
            }

             //close connection
             try
             {
                 input.close();
                 out.close();
                 clientSocket.close();
             }
             catch(IOException i)
             {
                 System.out.println(i);
             }
        }
        public static void main(String args[])
        {
            client Client = new client ("127.0.0.1",2222);
        }
}

  