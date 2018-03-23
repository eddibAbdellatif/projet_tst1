<!DOCTYPE html>
<html>
<?php $this->view('layouts/headTag'); ?>
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
    <?php $this->view('layouts/header'); ?>

    <?php $this->view('layouts/sidebar'); ?>

    <div class="content-wrapper">

        <section class="content">

            <?php $this->view('layouts/managerHeader'); ?>

            <div class="row">

                <section class="col-lg-12 connectedSortable">
                  <div class="row">
                    <div class="col-md-4">
                        <table class="table table-bordered table-striped">


                          <tr>
                            <th colspan="2"><h4 class="text-center">User Info</h3></th>

                          </tr>
                            <tr>
                              <td>User first Name</td>
                              <td><?php echo $this->session->userdata('user_first_name'); ?></td>
                            </tr>
                            <tr>
                              <td>User last Name</td>
                              <td><?php echo $this->session->userdata('user_last_name'); ?></td>
                            </tr>
                            <tr>
                              <td>User Email</td>
                              <td><?php echo $this->session->userdata('user_email');  ?></td>
                            </tr>

                        </table>
                    </div>
                  </div>
                </section>
            </div>
        </section>
        <input id="active-tree-view" type="hidden" value="produit-list"/>
    </div>

    <?php $this->view('layouts/footer'); ?>

    <div class="control-sidebar-bg"></div>
</div>
<?php $this->view('layouts/scriptTag'); ?>

</body>
</html>
