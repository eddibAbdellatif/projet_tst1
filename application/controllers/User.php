<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

//Dans le constructeur, nous chargeons trois bibliothèques url, model et session.
public function __construct(){

        parent::__construct();
      	$this->load->helper('url');
      	$this->load->model('user_model');
        $this->load->library('session');

}
/*La méthode d'index contiendra le code pour charger la vue de forme d'inscription.
Ainsi quand l'application commence le formulaire d'inscription apparaîtra sur le premier coup.*/

public function index(){
      $this->load->view('register');
      }
/*Dans cette méthode nous obtiendrons les entrées de l'utilisateur depuis
le formulaire d'inscription de codeigniter et vérifierons l'email
de la base de données que si cet email existe déjà ou non s'il existe
il montrera une erreur sinon il sauvegardera les données d'utilisateur dans la
base de données function register_user (), Donc l'utilisateur sera enregistré.*/

public function register_user(){

      $user=array(
      'user_first_name'=>$this->input->post('user_first_name'),
      'user_last_name'=>$this->input->post('user_last_name'),
      'user_email'=>$this->input->post('user_email'),
      'user_password'=>md5($this->input->post('user_password'))
        );
        //print_r($user);

$email_check=$this->user_model->email_check($user['user_email']);

if($email_check){
  $this->user_model->register_user($user);
  $this->session->set_flashdata('success_msg', 'Registered successfully.Now login to your account.');
  redirect('user/login_view');

}
else{

  $this->session->set_flashdata('error_msg', 'Error occured,Try again.');
  redirect('user');


}

}

/*Dans cette méthode, nous allons charger la vue du formulaire de connexion.*/

public function login_view(){
// var_dump($this->session->userdata());
$this->session->userdata();
$this->load->view('login');
}

/*Grâce à cette méthode, l'utilisateur se connectera à son compte.
Le premier utilisateur entre son email et mot de passe dans le formulaire de
connexion.Tous les champs de saisie seront maintenant attraper dans cette
méthode, puis envoyer ces valeurs dans la méthode modèle méthode login_user
pour vérifier et récupérer les enregistrements pour cet utilisateur spécifique
de la base de données MySQL . tous les enregistrements seront récupérés puis
nous les enregistrerons dans notre session afin que nous puissions les utiliser
pour le tableau de bord du profil.*/

function login_user(){
  $user_login=array(

  'user_email'=>$this->input->post('user_email'),
  'user_password'=>md5($this->input->post('user_password'))

    );

    $data=$this->user_model->login_user($user_login['user_email'],$user_login['user_password']);
      if($data)
      {
        $this->session->set_userdata('user_id',$data['user_id']);
        $this->session->set_userdata('user_email',$data['user_email']);
        $this->session->set_userdata('user_first_name',$data['user_first_name']);
        $this->session->set_userdata('user_last_name',$data['user_last_name']);
        //$this->session->set_userdata('user_mobile',$data['user_mobile']);
// var_dump($this->session->userdata());
        $this->session->userdata();
        //$this->load->view('user_profile');
        redirect('user/user_profile');

      }
      else{
        $this->session->set_flashdata('error_msg', 'Error occured,Try again.');
        $this->load->view('login');

      }
}

/*Dans cette méthode, nous allons charger l'interface user_profile.*/
function user_profile(){

  $this->load->view('user_profile');
}

/*Lorsque l'utilisateur cliquera
sur cette méthode, tous les fichiers de session de
l'utilisateur actuel seront détruits.*/

public function user_logout(){
  $this->session->sess_destroy();
  redirect('user/login_view', 'refresh');

  // $session=new CI_Session();
  //       $session->sess_destroy();
  //       redirect(site_url());
}



}
?>
