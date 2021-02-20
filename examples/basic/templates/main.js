exports.render = async ({ context }) => {
    return `
        <header>
            <strong>Carbon.</strong>
        </header>
        <main>
            ${context.content || ""}
        </main>
        <footer>
            &copy; ${new Date().getFullYear()}
        </footer>
    `;
};
