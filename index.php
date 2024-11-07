<?php if (isset($_GET['success'])): ?>
    <p>Thank you for your message! We'll get back to you soon.</p>
<?php endif; ?>

<?php if (isset($_GET['error'])): ?>
    <p>There was an error submitting your form. Please try again.</p>
<?php endif; ?>
