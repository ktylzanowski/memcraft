import classes from './Footer.module.css'

const Footer = () => {
    return <footer className={classes.footer}>
        <div className={classes.author}>Author</div>
        <div className={classes.links}>Links</div>
    </footer>
}

export default Footer