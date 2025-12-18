# Tactical Strike FPS

A browser-based first-person shooter game built with pure HTML5 Canvas and JavaScript.

## Overview

Tactical Strike is an action-packed FPS game featuring multiple weapons, progressive difficulty, and a shop system. Fight through waves of enemies, earn coins, and unlock powerful weapons to survive increasingly challenging levels.

## Features

### Gameplay
- Fast-paced FPS action with smooth controls
- Progressive difficulty system with leveling
- Enemy wave spawning mechanics
- Hit detection with visual feedback (hit markers, damage flash)
- Health and ammo management

### Weapons System
- **AR-47 Phantom** - Default assault rifle
- **Burst Rifle** - 3-round burst fire
- **Plasma Gun** - Energy weapon with high fire rate
- **Double Shot** - Fires 2 bullets simultaneously
- **Sniper Rifle** - High damage, slow fire rate
- **Triple Shot** - Fires 3 bullets simultaneously
- **Laser Gun** - Penetrating laser beam
- **Minigun** - Ultra-high fire rate
- **Rocket Launcher** - Explosive area damage

### Shop System
- Earn coins by defeating enemies (10 coins per 20 kills)
- Purchase weapons with earned currency
- Persistent weapon unlocks

### UI/UX
- Real-time HUD with health, ammo, kills, and level
- Crosshair targeting system
- Pause functionality
- Visual damage indicators
- Smooth animations and effects

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled

### Installation

1. Clone the repository
```bash
git clone https://github.com/shinyubin1015/Shooting-game.git
cd Shooting-game
```

2. Open the game
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Or simply open index.html in your browser
```

3. Navigate to `http://localhost:8000` in your browser

## Controls

| Key | Action |
|-----|--------|
| W/A/S/D | Move |
| Mouse | Aim |
| Left Click | Fire |
| R | Reload |
| Pause Button | Pause Game |

## Technical Details

### Built With
- HTML5 Canvas for rendering
- Vanilla JavaScript (ES6+)
- Tailwind CSS for UI styling
- Custom animation system

### Architecture
- Single-file architecture (index.html)
- Canvas-based 2D graphics engine
- Object-oriented enemy and bullet management
- State management for game flow
- Event-driven input handling

### Performance
- Optimized rendering pipeline
- Efficient collision detection
- RequestAnimationFrame for smooth 60fps gameplay

## Game Mechanics

### Scoring System
- Kill enemies to increase kill count
- Every 20 kills rewards 10 coins
- Use coins to unlock new weapons

### Difficulty Progression
- Enemy count increases with level
- Higher levels spawn more enemies per wave
- Dynamic difficulty scaling

### Combat System
- Real-time bullet physics
- Distance-based hit detection
- Weapon-specific damage values
- Reload mechanics with cooldowns

## Development

### Project Structure
```
Shooting-game/
├── index.html          # Main game file
└── README.md          # Project documentation
```

### Key Components
- Game loop and rendering engine
- Weapon system with multiple types
- Enemy AI and spawning system
- Shop and progression mechanics
- HUD and UI management

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Chrome | Yes |
| Firefox | Yes |
| Safari | Yes |
| Edge | Yes |
| Opera | Yes |

## Known Issues

- None currently reported

## Future Enhancements

- [ ] Sound effects and background music
- [ ] Additional weapon types
- [ ] Boss battles
- [ ] Multiple enemy types
- [ ] Power-ups and buffs
- [ ] Leaderboard system
- [ ] Mobile touch controls
- [ ] Multiple game modes

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

shinyubin1015

## Acknowledgments

- Built as a learning project for browser-based game development
- Inspired by classic FPS games

---

Made with HTML5 Canvas and JavaScript
