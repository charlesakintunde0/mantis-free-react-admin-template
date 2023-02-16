import React from 'react'
import './Footer.css';
function Footer() {
    return (
        <div>
            <footer class="footer-distributed">
            
                <div class="footer-left">

                    <h3>IP<span>MS</span></h3>

                    <p class="footer-links">
                        <a href="#" class="link-1">Home</a>
                    
                        <a href="#">About</a>
                        
                        <a href="#">Faq</a>
                        
                        <a href="#">Contact</a>
                    </p>

                    <p class="footer-company-name">IPMS ©2022</p>
                </div>

                <div class="footer-center">

                    <div>
                        <i class="fa fa-map-marker"></i>
                        <p><span>550 University Ave, Charlottetown</span> PE C1A 4P3, Canada</p>
                    </div>

                    <div>
                        <i class="fa fa-phone"></i>
                        <p>+1 (902) 314 7727</p>
                    </div>

                    <div>
                        <i class="fa fa-envelope"></i>
                        <p><a href="mailto:support@company.com">msami@upei.ca</a></p>
                    </div>

                </div>

                <div class="footer-right">

                    <p class="footer-company-about">
                        <span>About us</span>
                        This website is made for the farmers to make farming more accessible
                    </p>

                    <div class="footer-icons">

                        <a href="#"><i class="fa fa-facebook"></i></a>
                        <a href="#"><i class="fa fa-twitter"></i></a>
                        <a href="#"><i class="fa fa-linkedin"></i></a>
                        <a href="#"><i class="fa fa-github"></i></a>

                    </div>

                </div>

            </footer>
        </div>
    )
}

export default Footer
