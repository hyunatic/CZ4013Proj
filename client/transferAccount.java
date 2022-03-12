import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JPasswordField;
import javax.swing.JTextField;
import java.awt.event.*;

public class transferAccount implements ActionListener {

    //private static final ActionListener Currencylistener = null;
    private static JLabel userLabel;
    private static JTextField userText;
    private static JLabel accountLabel;
    private static JTextField accountText;
    private static JLabel passLabel;
    private static JPasswordField passText;
    private static JLabel Label;
    private static JLabel payeeaccountLabel;
    private static JTextField payeeaccountText;
    private static JLabel currencyLabel;
    //private static JTextField currencyText;
    private static JComboBox currencyText;
    private static JLabel amountLabel;
    private static JPasswordField amountText;
    private static JButton transbutton;
    private static JButton backbutton;
    private static JLabel success;
    
    public void transferpage()   {
        JPanel panel = new JPanel();
        JFrame frame = new JFrame();
        frame.setSize(350,350);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.add(panel);
        panel.setLayout(null);

        userLabel = new JLabel("User");
        userLabel.setBounds(10,20,80,25);
        panel.add(userLabel);

        userText = new JTextField();
        userText.setBounds(100,20,165,25);
        panel.add(userText);

        accountLabel = new JLabel("Account No");
        accountLabel.setBounds(10,50,80,25);
        panel.add(accountLabel);

        accountText = new JTextField();
        accountText.setBounds(100,50,165,25);
        panel.add(accountText);


        passLabel = new JLabel("Password");
        passLabel.setBounds(10,80,80,25);
        panel.add(passLabel);

        passText = new JPasswordField();
        passText.setBounds(100,80,165,25);
        panel.add(passText);

        Label = new JLabel("________________________________________");
        Label.setBounds(10,95,400,25);
        panel.add(Label);

        payeeaccountLabel = new JLabel("Payee Acc No");
        payeeaccountLabel.setBounds(10,120,80,25);
        panel.add(payeeaccountLabel);

        payeeaccountText = new JTextField();
        payeeaccountText.setBounds(100,120,165,25);
        panel.add(payeeaccountText);

        currencyLabel = new JLabel("Currency Type");
        currencyLabel.setBounds(10,150,150,25);
        panel.add(currencyLabel);

        String[] moneytype = {"SGD", "USD", "EUR", "JPY", "HKD"};
        currencyText = new JComboBox(moneytype);
        
        currencyText.setBounds(100,150,165,25);
        panel.add(currencyText);

        amountLabel = new JLabel("Amount");
        amountLabel.setBounds(10,180,80,25);
        panel.add(amountLabel);

        amountText = new JPasswordField();
        amountText.setBounds(100,180,165,25);
        panel.add(amountText);

        transbutton = new JButton("Transfer");
        transbutton.setBounds(10,220,150,25);
        transbutton.addActionListener(new transferAccount());
        panel.add(transbutton);

        backbutton = new JButton("Back");
        backbutton.setBounds(180,220,150,25);
        backbutton.addActionListener(new deposit());
        panel.add(backbutton);

        success = new JLabel("");
        success.setBounds(10,250,300,25);
        panel.add(success);

        frame.setVisible(true);
    }

    @Override
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == transbutton)
        {
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
    else if (e.getSource()== backbutton)
       {
           // not sure how to code return back to previous screen :X
           //menu menupg = new menu();
           // menupg.menupage();
       } 
    }
}

