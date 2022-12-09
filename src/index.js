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
    });

    // عندما تغير كمية المنتج
    $('[data-product-quantity]').change(function(){

        // اجلب الكمية الجديده
        var newQuantity= $(this).val();

        // ابحث عن السطر الذي يحتوي معلومات هذا المنتج
        var $parent = $(this).parents('[data-product-info]');

        // اجلب سعر القطعه الواحدة من معلومات المنتج
        var pricePerUnit  = $parent.attr('data-product-price');

        // السعر الإجمالي للمنتج هو سعر القطعه مضروبا بعددها
        var totalPriceProdcut = newQuantity * pricePerUnit;

        // عين السعر الجديد ضمن خلية السعر الإجمالي للمنتج في هذا السطر
        $parent.find('.total-price-product').text(totalPriceProdcut + '$');
        
        // تحديث السعر الاجمالي
        calulateTotalPrice();

    });


    $('[data-remove-from-cart]').click(function(){
        $(this).parents('[data-product-info]').remove();

        calulateTotalPrice();
    });

    function calulateTotalPrice() {
        // متغير جديد لحفظ السعر الإجمالي
        var totalPriceForAllProduct = 0;
    
        // لكل سطر يمثل معلومات المنتج في الصفحه
        $('[data-product-info]').each(function () {
    
              // اجلب سعر القعطه الواحدة 
              var pricePerUnit = $(this).attr('data-product-price');
    
              // اجلب كمية المنتج من اختيار الكميه
              var quantity = $(this).find('[data-product-quantity]').val();
    
              // حساب سعر المنتج الحالي
              var productPrice = pricePerUnit * quantity;
    
              // جمع قيمة المنتج الحالي مع السعر الاجمالي لكل المنتجات
              totalPriceForAllProduct = totalPriceForAllProduct + productPrice;
    
              // جلب السعر الإجمالي
              $('#total-price-for-all-products').text(totalPriceForAllProduct + '$');
    
        });
    }
    var citiesByCountry ={
        sa: ['الرياض','جده','القصيم'],
        eg: ['القاهرة','الإسكندرية'],
        jo: ['عمان','الزرقاء'],
        sy: ['دمشق','حلب']
    };
    // تغير المدينه على الدوله
    $('#form-checkout select[name="country"]').change(function(){
        // جلب البلد
       var Country = $(this).val();
    //    جلب المدن من البلد 
       var cities=  citiesByCountry[Country];
    //    تفريغ قائمة المدن
        $('#form-checkout select[name="city"]').empty();
        // إضافة خيار اختر مدينه
        $('#form-checkout select[name="city"]').append(
         '<option disabled selected value="">إختر المدينة</option>'
        );
        // اضف المدن الى قائمة المدن
        cities.forEach(function(city){
            var newOption = $('<option></option>');
            newOption.text(city);
            newOption.val(city);
            $('#form-checkout select[name="city"]').append(newOption);
        });
    });

    //  عندما تغير طريقة الدفع
    $('#form-checkout input[name="payment_method"]').change(function(){

            //  جلب الفيمة المختاره
            var paymentMethod = $(this).val();

            if (paymentMethod === 'on_delivery'){

                 //  اذا كان الدفع عن الاستلام يعطل حقول البطاقه
                 $('#credit-card-info-input').prop('disabled',true)
            }else{
                //  واذا فعلها
                $('#credit-card-info-input').prop('disabled',false)
            }

                //  بدل معلومات بطاؤة الاتمان بين الظهور والاخفاء
                $('#credit-card-info').toggle();
    });

});