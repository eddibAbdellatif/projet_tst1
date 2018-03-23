<header class="main-header">
  <!-- Logo -->
  <a href="<?php echo base_url()."assets/"; ?>index2.html" class="logo"></a>
  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
      <span class="sr-only">Toggle navigation</span>
    </a>

    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">

        <li class="dropdown user user-menu">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <img src="<?php echo base_url()."assets/"; ?>dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
            <span class="hidden-xs">Alexander Pierce</span>
          </a>
          <ul class="dropdown-menu">
            <!-- User image -->
            <li class="user-header">
              <p>
                Alexander Pierce - Web Developer
                <small>Member since Nov. 2012</small>
              </p>
            </li>
            <!-- Menu Body -->

            <!-- Menu Footer-->

          </ul>
        </li>
        <!-- Control Sidebar Toggle Button -->
        <li>
          <!-- <a href="<?php echo site_url('user/user_logout');?>" data-toggle="control-sidebar"><i class="fa fa-sign-out"></i></a> -->
          <a href="<?php echo site_url('user/user_logout');?>" >  <i class="fa fa-sign-out"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</header>
