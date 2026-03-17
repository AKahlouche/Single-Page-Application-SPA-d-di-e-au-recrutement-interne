import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        © {new Date().getFullYear()} HR-Connect Elite
      </div>
    </footer>
  );
}