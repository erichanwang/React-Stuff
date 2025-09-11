# React Tic-Tac-Toe Game

A classic Tic-Tac-Toe game built with React and Vite, optimized for deployment on Cloudflare Pages.

## Features

- Interactive Tic-Tac-Toe gameplay
- Move history tracking with the ability to jump to any previous move
- Automatic winner detection
- Alternating player turns (X and O)
- Clean, responsive UI with CSS styling
- Optimized for fast loading and deployment

## Tech Stack

- **React** 18.2.0 - UI library
- **Vite** 4.4.5 - Build tool and development server
- **JavaScript** (ES6+) - Programming language
- **CSS** - Styling
- **Cloudflare Pages** - Deployment platform

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd react-cloudflare-deploy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Development

Start the development server:
```bash
npm run dev
```

This will start the Vite development server, typically at `http://localhost:5173`.

### Build for Production

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## How to Play

1. The game starts with player X's turn
2. Click on any empty square to make your move
3. Players alternate turns between X and O
4. The first player to get three of their marks in a row (horizontally, vertically, or diagonally) wins
5. Use the move history buttons to review previous game states
6. Click "Go to game start" to reset the game

## Deployment

This project is configured for easy deployment on Cloudflare Pages:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Connect your repository to Cloudflare Pages
3. Set the build command to: `npm run build`
4. Set the build output directory to: `dist`
5. Deploy!

The Vite configuration includes `base: './'` which ensures assets load correctly on Cloudflare Pages.

## Project Structure

```
react-cloudflare-deploy/
├── public/
├── src/
│   ├── App.jsx          # Main game component
│   ├── index.jsx        # Application entry point
│   ├── styles.css       # Game styling
│   └── index.html       # HTML template
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test them
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React and Vite
