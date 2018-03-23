<?php

defined('BASEPATH') OR exit ('No direct script access allowed');

/**
 * class User_librarie
 */
class User_librarie
{
    /**
     * @var CI_Controller
     */
    protected $CI;

    /**
     * User constructor.
     */
    public function __construct(){
    $CI = & get_instance();
    $CI->load->library('session');
    }

      /**
       * Methode qui retourne le profile principal
       * de l'utilisateur connecté
       * @return string
       */
     public function getProfile(){
       return $this->CI->session->userdata('type_user')
     }

}



 ?>
