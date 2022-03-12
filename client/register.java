import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import java.awt.event.*;

public class register implements ActionListener {

    private static JLabel userLabel;
    private static JTextField userText;
    private static JLabel passLabel;
    private static JPasswordField passText;
    private static JLabel currencyLabel;
    //private static JTextField currencyText;
    private static JComboBox currencyText;
    private static JLabel initLabel;
    private static JTextField initText;
    private static JButton regbutton;
    private static JButton backbutton;
    private static JLabel success;

    public void registerpage() {
        JPanel panel = new JPanel();
        JFrame frame = new JFrame();
        frame.setSize(350,300);
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

        currencyLabel = new JLabel("Currency Type");
        currencyLabel.setBounds(10,80,120,25);
        panel.add(currencyLabel);

        String[] moneytype = {"SGD", "USD", "EUR", "JPY", "HKD"};
        currencyText = new JComboBox(moneytype);
        //currencyText = new JTextField();
        currencyText.setBounds(100,80,165,25);
        panel.add(currencyText);

        initLabel = new JLabel("Initial Balance");
        initLabel.setBounds(10,110,80,25);
        panel.add(initLabel);

        initText = new JTextField();
        initText.setBounds(100,110,165,25);
        panel.add(initText);

        regbutton = new JButton("Create");
        regbutton.setBounds(10,170,150,25);
        regbutton.addActionListener(new register());
        panel.add(regbutton);

        backbutton = new JButton("Back");
        backbutton.setBounds(180,170,150,25);
        backbutton.addActionListener(new deposit());
        panel.add(backbutton);

        success = new JLabel("");
        success.setBounds(10,200,300,25);
        panel.add(success);

        frame.setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource()== regbutton)
        {
        String user = userText.getText();
        String password = passText.getText();
        String currency = (String) currencyText.getSelectedItem();
        String inital = initText.getText();
        System.out.println(user + ", " + password + ", " + currency + ", " +inital);

        if(user.equals("Brendan") && password.equals("123") && currency.equals("SGD") && inital.equals("1")){
            success.setText("Login successful");
        }
        else {
            success.setText("");
        }
    }
    else if (e.getSource()== backbutton)
       {
           // not sure how to code return back to previous screen :X
           //menu menupg = new menu();
           // menupg.menupage();
       } 
    }
}
