import '@laylazi/bootstrap-rtl/dist/css/bootstrap-rtl.min.css';
import './css/style.css';
import 'bootstrap';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min';
import 'popper.js/dist/popper.min';
import '@fortawesome/fontawesome-free/js/all.min'
import 'webpack-jquery-ui';
import 'bootstrap/dist/js/bootstrap.min.js';

$(function(){
    $('[data-toggle="tooltip"]').tooltip()
    
    $('.add-to-cart-btn').click(function(){
        alert("أضيف المنتج إلى عربة الشراء");
    });
    $('#copyright').text(" جميع الحقوق محفوظة للمتجر سنه "   + new Date().getFullYear());
    
    $('.product-option input[type="radio"]').change(function(){
        $(this).parents('.product-option').siblings().removeClass('active');
        $(this).parents('.product-option').addClass('active');
    })
});