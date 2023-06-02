import css from './user.module.scss';

export const User = () =>{
    return(
        <div className={css.user + " " + css.section}>
            <p>Avatr</p>
            <input type="file" name="file" />

            <ul>
                <li>Name:User</li>
                <li>Email:User@asdfs.com</li>
                <li>Phome:1234543</li>
                <li>Age:12</li>
            </ul>
        </div>
    );
}