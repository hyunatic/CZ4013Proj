//Trial not usable

import java.awt.event.ActionEvent;
import java.awt.event.MouseEvent;
import java.io.*;
import java.util.*;

import javax.swing.JButton;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JPanel;
import javax.swing.table.DefaultTableModel;
import javax.swing.JTable;


public class mainMenu extends javax.swing.JFrame{
    
    //private Bank bank;
    private final DefaultTableModel model;
    private javax.swing.JTable accountTable;


    public mainMenu(){
        initComponents();
        setLocationRelativeTo(null);
        //bank = new Bank();
        //model = accountTable.getModel();
        model = (DefaultTableModel) accountTable.getModel();
    }

    private void initComponents() {
        JPanel contentPanel = new javax.swing.JPanel();
        JButton addAccountBtn = new javax.swing.JButton();
        JButton removeAccountBtn = new javax.swing.JButton();
        JButton depositBtn = new javax.swing.JButton();
        JButton withdrawBtn = new javax.swing.JButton();
        JTable accountTable = new javax.swing.JTable();
        JMenuBar menuBar = new javax.swing.JMenuBar();
        JMenu fileMenu = new javax.swing.JMenu();
        JMenuItem exitMenuItem = new javax.swing.JMenuItem();
        
        setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
        setTitle("Bank Application");
        

        addAccountBtn.setText("Add Account");
        addAccountBtn.addActionListener(new java.awt.event.ActionListener()
        {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                addAccountBtnActionPerformed(evt);
                dispose();
            }  
        });

        removeAccountBtn.setText("Remove Account");
        removeAccountBtn.setEnabled(false);
        removeAccountBtn.addActionListener(new java.awt.event.ActionListener()
        {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                removeAccountBtnActionPerformed(evt);
            }
        });

        depositBtn.setText("Deposit");
        depositBtn.setEnabled(false);
        depositBtn.addActionListener(new java.awt.event.ActionListener()
        {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                depositBtnActionPerformed(evt);
            }
        });

        withdrawBtn.setText("Withdrawl");
        withdrawBtn.setEnabled(false);
        withdrawBtn.addActionListener(new java.awt.event.ActionListener()
        {
            public void actionPerformed(java.awt.event.ActionEvent evt) {
                withdrawBtnActionPerformed(evt);
            }
        });

        accountTable.setAutoCreateRowSorter(true);
        accountTable.setModel(new javax.swing.table.DefaultTableModel(
            new Object [][]{

            },
            new String[] {
                "First Name" , "Last Name", "Account Number", "Balance"
        })
        {
            Class[] types = new Class[] {
                java.lang.String.class, java.lang.String.class, java.lang.Integer.class, java.lang.String.class
            };
            boolean[] canEdit = new boolean[] {
                false, false, false, false
            };

             
        });
        accountTable.setSelectionMode(javax.swing.ListSelectionModel.SINGLE_SELECTION);
        accountTable.getTableHeader().setReorderingAllowed(false);
        accountTable.addMouseListener(new java.awt.event.MouseAdapter()
        {
            public void mouseClicked(java.awt.event.MouseEvent evt){
                accountTableMouseClicked(evt);
            }
        });

    }

    private void accountTableMouseClicked(MouseEvent evt) {
    }

    private void withdrawBtnActionPerformed(java.awt.event.ActionEvent evt) {
    }

    private void depositBtnActionPerformed(java.awt.event.ActionEvent evt) {
    }

    private void removeAccountBtnActionPerformed(java.awt.event.ActionEvent evt) {
    }

    private void addAccountBtnActionPerformed(java.awt.event.ActionEvent evt) {
        //AddAccountMenu menu = new AddAccountMenu(this, true, bank);
        //menu.setVisible(true);
    }
    public static void main(String args[]) {
        
        /* Create and display the form */
        java.awt.EventQueue.invokeLater(new Runnable() {
            public void run() {
                new mainMenu().setVisible(true);
            }
        });
    }
}

