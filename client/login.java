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
    private static JButton loginbutton;
    private static JButton regbutton;
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

        loginbutton = new JButton("Login");
        loginbutton.setBounds(10,80,80,25);
        loginbutton.addActionListener(new login());
        panel.add(loginbutton);

        regbutton = new JButton("Register");
        regbutton.setBounds(100,80,100,25);
        regbutton.addActionListener(new login());
        panel.add(regbutton);

        success = new JLabel("");
        success.setBounds(10,110,300,25);
        panel.add(success);

        frame.setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        if (e.getSource() == loginbutton){
        String user = userText.getText();
        String password = passText.getText();
        System.out.println(user + ", " + password);

        if(user.equals("Brendan") && password.equals("123")){
            success.setText("Login successful");
            menu menupg = new menu();
            menupg.menupage();
        }
        else {
            success.setText("Wrong password");
        }
    }
        else if (e.getSource() == regbutton)
        {
            System.out.println("register");
            register registerpg = new register();
            registerpg.registerpage();  
        }
    }
}
