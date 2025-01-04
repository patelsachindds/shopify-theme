function add_discount(discount_code){

      var accessToken = btoa(JSON.parse($("#shopify-features").html()).accessToken);
      discount_code = discount_code.toUpperCase();
      $(".discount-input-response").html("");
      $(".discount-btn").html('<div class="discount_loader"></div>');
      applied_discount = "";

      $.ajax({
        url: "cart.js",
        type: "GET",
        dataType: "json",
        success: function(cart){

          var checkout_data = {'discount_code': discount_code, 'gift_cards': [] , 'line_items': cart.items};
          fetch('/wallets/checkouts/', {
            method: "POST",
            body: JSON.stringify({'checkout': checkout_data}),
            credentials: "same-origin",
            headers: {
              Authorization: "Basic "+accessToken,
              "Content-Type": "application/json"
            }
          }).then(response => response.json())
          .then(data => {
            $(".discount-btn").html('Submit');

            if(typeof data.checkout !== 'undefined'){

              if(data.checkout.applied_discount.non_applicable_reason){
                reason = data.checkout.applied_discount.non_applicable_reason;
                $(".discount-input-response").html(reason);
              }else{
                discount_amount = data.checkout.applied_discount.amount;
                after_discount = data.checkout.total_price;
                $(".discount-amount").text("€"+discount_amount);
                $(".discount-total-label").show().find('.discount-total-amount').text("€"+after_discount);
                applied_discount = JSON.stringify(data.checkout);
              }
              
              $.ajax({
                url: "/discount/"+discount_code+"?redirect=/checkout",
                type: "GET",
                success: function(cart){}
              });


            }else{
              $(".discount-input-response").html('Invalid Code');
            }

          });
        }
      });
    }