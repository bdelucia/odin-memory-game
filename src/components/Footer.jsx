import '../index.css';

function Footer() {
  return (
    <>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            Bobbeh Industries Ltd
          </p>
        </aside>
      </footer>
    </>
  );
}

export default Footer;
