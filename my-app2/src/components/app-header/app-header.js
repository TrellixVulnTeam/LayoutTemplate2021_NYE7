import './app-header.scss'

const AppHeader = () => {
    const data = [
        {
            name: 'Coffee house',
            link: '#'
        },
        {
            name: 'Our coffee',
            link: '#'
        },
        {
            name: 'For your pleasure',
            link: '#'
        }
    ];
    const navItems = data.map((item) => {
        return (
            <li className='nav-item'>
                <a href={item.link} className="nav-link text-white">{item.name}</a>
            </li >
        )
    });
    return (
        <header className='app-header'>
            <nav className='nav'>
                {navItems}
            </nav>

            <div class="hero text-center">
                <h1 class="display-5 fw-bold">Evrything You Love About Coffee</h1>
                <div class="col-lg-6 mx-auto">
                    <h3>We makes every day full of energy and taste<br />Want to try our beans ?</h3>
                    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <button type="button" class="btn btn-outline-light btn-lg px-5 py-1">More</button>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default AppHeader;