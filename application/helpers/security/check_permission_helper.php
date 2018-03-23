<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/*
 * Fonction qui permet de vérifier les permission
 */

if(!function_exists('has_permission')){

    function has_permission($profile){

      $CI = & get_instance();
      $CI->load->library('User_librarie');
      //if user is admin return true
      if ($CI->user_librarie->getProfile() == ADMIN_PROFILE || in_array($CI->user_librarie->getUser(), unserialize(ADMIN_ID)))
      {
          return true;
      }

      $profiles = @unserialize($profile);//for not trigger error
      //is serializable
      if(($profiles !== false)){
           //On boucle sur les profiles de l'utilisateur
           foreach ($CI->user_librarie->getProfile() as $userProfile){
             if (is_object($userProfile)) {
               $userProfile = $userProfile->nom;
             }
             if (in_array($userProfile, $profiles)) {
               return true;
             }
           }
      }
      //On boucle sur les profiles de l'utilisateur
      foreach ($CI->user_librarie->getProfile() as $userProfile) {
        if(is_object($userProfile)) {
          $userProfile = $userProfile->nom;
        }
        if ($userProfile == $profile){
          return true;
        }
      }
      return true;
    }

}



 ?>
