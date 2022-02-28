import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import java.awt.event.*;

public class login implements ActionListener {

    private static JLabel userLabel;
    private static JTextField userText;
    private static JLabel passLabel;
    private static JPasswordField passText;
    private static JButton button;
    private static JLabel success;
    public static void main(String[] args) {
        JPanel panel = new JPanel();
        JFrame frame = new JFrame();
        frame.setSize(350,200);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(panel);
        panel.setLayout(null);

        userLabel = new JLabel("User");
        userLabel.setBounds(10,20,80,25);
        panel.add(userLabel);

        userText = new JTextField();
        userText.setBounds(100,20,165,25);
        panel.add(userText);

        passLabel = new JLabel("Password");
        passLabel.setBounds(10,50,80,25);
        panel.add(passLabel);

        passText = new JPasswordField();
        passText.setBounds(100,50,165,25);
        panel.add(passText);

        button = new JButton("Login");
        button.setBounds(10,80,80,25);
        button.addActionListener(new login());
        panel.add(button);

        success = new JLabel("");
        success.setBounds(10,110,300,25);
        panel.add(success);

        frame.setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        String user = userText.getText();
        String password = passText.getText();
        System.out.println(user + ", " + password);

        if(user.equals("Brendan") && password.equals("123")){
            success.setText("Login successful");
        }
        else {
            success.setText("");
        }
    }
}
