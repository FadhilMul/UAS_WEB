<?php $__env->startSection('title', 'Menu'); ?>

<?php $__env->startSection('content'); ?>
<div class="container py-5">
  <h1>Dashboard - <?php echo e($restaurant->name); ?></h1>
  <div class="menu-section">
    <?php $__currentLoopData = $menus; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $menu): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
    <div class="menu-item-card">
      <img src="<?php echo e($menu->image_url); ?>" alt="Menu Image">
      <p><?php echo e($menu->name); ?></p>
      <p>Rp<?php echo e(number_format($menu->price, 0, ',', '.')); ?></p>
      <button class="add-to-cart-btn"
        data-id="<?php echo e($menu->id); ?>"
        data-name="<?php echo e($menu->name); ?>"
        data-price="<?php echo e($menu->price); ?>">
        Add to Cart
      </button>
    </div>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
  </div>
</div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\laragon\www\webuas\resources\views/index.blade.php ENDPATH**/ ?>