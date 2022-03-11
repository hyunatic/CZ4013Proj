import javax.swing.*;
import java.awt.event.*;

public class menu  {
    public void menupage(){
        JLabel welcome = new JLabel("Welcome   Xxxx Xxxx ");
        JFrame frame = new JFrame();
        JPanel contentPanel = new JPanel();
        JButton transferMoney = new JButton();
        JButton removeAccountBtn = new JButton();
        JButton depositBtn = new JButton();
        JButton withdrawBtn = new JButton();
        JTable accountTable;
        JMenuBar menuBar = new JMenuBar();
        JMenu fileMenu = new JMenu();
        JMenuItem exitMenuItem = new JMenuItem();
        JLabel Balance = new JLabel("Balance: ");
        
        welcome.setBounds(350,20,200,25);
        Balance.setBounds(30,150,200,25);


        transferMoney.setText("Transfer");
        transferMoney.setBounds(260,50,110,30);
        
        removeAccountBtn.setText("Remove Account");
        removeAccountBtn.setBounds(375,50,110,30);
        //removeAccountBtn.setEnabled(false);

        depositBtn.setText("Deposit");
        depositBtn.setBounds(30,50,110,30);
        //depositBtn.setEnabled(false);
        depositBtn.addActionListener(new depositlistener());

        withdrawBtn.setText("Withdrawl");
        withdrawBtn.setBounds(145,50,110,30);
        //withdrawBtn.setEnabled(false);
        withdrawBtn.addActionListener(new Buttonlistener());
    
        frame.add(welcome);
        frame.add(transferMoney);
        frame.add(removeAccountBtn);
        frame.add(depositBtn);
        frame.add(withdrawBtn);
        frame.add(Balance);

        frame.setSize(600,500);
        frame.setLayout(null);
        frame.setVisible(true);
    }

    private class Buttonlistener implements ActionListener{
    @Override
    public void actionPerformed(ActionEvent e) {
        
        withdrawal withdrawlpg = new withdrawal();
        withdrawlpg.withdrawalpage();
        System.out.println("trial");
        
    }
}

private class depositlistener implements ActionListener{
    @Override
    public void actionPerformed(ActionEvent e) {
        
        register registerpg = new register();
        registerpg.registerpage();
        System.out.println("trial");
        
    }
}

}
        
  