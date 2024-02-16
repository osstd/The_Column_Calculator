function calculate_phi_pn(moment_of_inertia, section_area, kl, steel_modulus_of_elasticity = 29000, f_y = 50) {
    /*        
        This function calculates structural steel column capacity based on moment of inertia, section area,
        unbraced column length (kl), steel_modulus_of_elasticty and steel yield stress (f_y)
    */ 
    let phi = 0.9;
    let radius_of_gyration = Math.sqrt(moment_of_inertia / section_area);

    if (kl === 0) {
        kl += 0.00001;
    } else {
        kl *= 12;
    }

    // elastic critical stress
    let f_e = Math.PI ** 2 * steel_modulus_of_elasticity / ((kl / radius_of_gyration) ** 2);

    if (kl / radius_of_gyration <= (4.71 * Math.sqrt(steel_modulus_of_elasticity / f_y))) {
        f_cr = Math.pow(0.658, (f_y / f_e)) * f_y;
    } else if (kl / radius_of_gyration >= 200) {
        f_cr = 0;
    } else {
        f_cr = 0.8777 * f_e;
    }

    // multiply phi factor with section area and f_cr
    let phi_pn = Math.floor(phi * section_area * f_cr);

    return phi_pn;
}

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the submit button
    document.getElementById("resultsbutton").addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get input values
        let moment_of_inertia = parseFloat(document.getElementById('moment_of_inertia').value);
        let section_area = parseFloat(document.getElementById('section_area').value);
        let k_l = parseFloat(document.getElementById('k_l').value);
        let steel_modulus_of_elasticity = parseFloat(document.getElementById('steel_modulus_of_elasticity').value);
        let f_y = parseFloat(document.getElementById('steel_yield_stress').value);
        
        // Check if all inputs are filled
        if (moment_of_inertia && section_area && k_l && steel_modulus_of_elasticity && f_y) {
            // Call calculate_phi_pn function
            let phi_pn = calculate_phi_pn(moment_of_inertia, section_area, k_l, steel_modulus_of_elasticity, f_y);
            let output = "Design Axial Capacity of the Column is: " + phi_pn + " kips";
            
            let display = document.getElementById("output")
            display.innerHTML = "";
            display.innerHTML = output;
            display.style.display = "block";
             
            // Display output or handle as required
            console.log(output);
        } else {
            // Handle missing inputs
            alert('Please fill all of the boxes.');
        }
    });
});
