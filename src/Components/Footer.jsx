import ContactMeButton from "./ContactMeButton";

const Footer = () => {
    return (
        <footer className="h-16 border-t flex justify-between items-center px-20 py-8">
            <h1 className="text-xl font-semibold">online-market Copyright 2024</h1>
            <ContactMeButton>Contact Me!</ContactMeButton>
        </footer>
    )
}

export default Footer;