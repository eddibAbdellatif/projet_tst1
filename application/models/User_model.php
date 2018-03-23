<?php
class User_model extends CI_model{

/*C'est la méthode register_user () du User_model dans laquelle toutes
les entrées collectées dans le formulaire seront enregistrées en utilisant
la requête SQL CodeIgniter dans la base de données MySQL.*/

public function register_user($user){
    $this->db->insert('user', $user);
}

 /*Dans la méthode login_user (), le courrier électronique et le mot de passe
 sont envoyés via  la méthode du contrôleur et récupèrent les données
 utilisateur spécifiques  via les requêtes SQL CodeIgniter.*/
public function login_user($email,$pass){

  $this->db->select('*');
  $this->db->from('user');
  $this->db->where('user_email',$email);
  $this->db->where('user_password',$pass);

  if($query=$this->db->get())
  {
      return $query->row_array();
  }
  else{
    return false;
  }
}

/*email_check () permet de vérifier que si l'email d'enregistrement est déjà enregistré ou non.*/

public function email_check($email){

  $this->db->select('*');
  $this->db->from('user');
  $this->db->where('user_email',$email);
  $query=$this->db->get();

  if($query->num_rows()>0){
    return false;
  }else{
    return true;
  }

}

}


?>
