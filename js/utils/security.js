/**
 * 보안 및 변조 방지 시스템
 * F12 방지, 우클릭 방지, 콘솔 감지, 변수 무결성 체크
 */

(function() {
  'use strict';

  // 개발자 도구 열림 감지
  let devtoolsOpen = false;
  const threshold = 160;

  // 주요 변수 무결성 체크를 위한 해시 저장
  const integrityCheck = {
    lastCoins: null,
    lastKills: null,
    checkInterval: null
  };

  /**
   * F12 및 단축키 방지
   */
  function preventDevTools() {
    document.addEventListener('keydown', function(e) {
      // F12 방지
      if (e.key === 'F12') {
        e.preventDefault();
        showWarning('개발자 도구는 사용할 수 없습니다.');
        return false;
      }
      
      // Ctrl+Shift+I (개발자 도구)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showWarning('개발자 도구는 사용할 수 없습니다.');
        return false;
      }
      
      // Ctrl+Shift+J (콘솔)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        showWarning('콘솔은 사용할 수 없습니다.');
        return false;
      }
      
      // Ctrl+U (소스 보기)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showWarning('소스 보기는 사용할 수 없습니다.');
        return false;
      }
      
      // Ctrl+Shift+C (요소 선택)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
      }
    });
  }

  /**
   * 우클릭 방지
   */
  function preventContextMenu() {
    document.addEventListener('contextmenu', function(e) {
      e.preventDefault();
      showWarning('우클릭은 사용할 수 없습니다.');
      return false;
    });
  }

  /**
   * 개발자 도구 열림 감지
   */
  function detectDevTools() {
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
      if (!devtoolsOpen) {
        devtoolsOpen = true;
        handleDevToolsOpen();
      }
    } else {
      devtoolsOpen = false;
    }
  }

  /**
   * 개발자 도구 열림 처리
   */
  function handleDevToolsOpen() {
    showWarning('개발자 도구가 감지되었습니다!');
    
    // 게임이 실행 중이면 일시정지
    if (window.gameState && window.gameState.gameRunning && !window.gameState.gamePaused) {
      // 일시정지 기능 호출
      const pauseBtn = document.getElementById('pauseBtn');
      if (pauseBtn) {
        pauseBtn.click();
      }
    }
  }

  /**
   * 콘솔 사용 감지
   */
  function detectConsole() {
    const devtools = /./;
    devtools.toString = function() {
      handleDevToolsOpen();
      return 'devtools';
    };
    
    console.log('%c', devtools);
  }

  /**
   * 게임 상태 무결성 체크
   */
  function startIntegrityCheck() {
    integrityCheck.checkInterval = setInterval(() => {
      if (!window.gameState) return;
      
      const state = window.gameState;
      
      // 비정상적인 코인 증가 감지
      if (integrityCheck.lastCoins !== null) {
        const coinDiff = state.coins - integrityCheck.lastCoins;
        // 한 번에 1000 코인 이상 증가는 비정상
        if (coinDiff > 1000) {
          handleTampering('비정상적인 코인 증가 감지');
          state.coins = integrityCheck.lastCoins;
        }
      }
      
      // 비정상적인 킬 수 증가 감지
      if (integrityCheck.lastKills !== null) {
        const killDiff = state.kills - integrityCheck.lastKills;
        // 한 번에 100킬 이상 증가는 비정상
        if (killDiff > 100) {
          handleTampering('비정상적인 킬 수 증가 감지');
          state.kills = integrityCheck.lastKills;
        }
      }
      
      // 음수 값 방지
      if (state.coins < 0) {
        handleTampering('비정상적인 코인 값 감지');
        state.coins = 0;
      }
      
      if (state.kills < 0) {
        handleTampering('비정상적인 킬 수 값 감지');
        state.kills = 0;
      }
      
      // 현재 값 저장
      integrityCheck.lastCoins = state.coins;
      integrityCheck.lastKills = state.kills;
      
    }, 1000); // 1초마다 체크
  }

  /**
   * 변조 감지 시 처리
   */
  function handleTampering(message) {
    console.warn('🚨 ' + message);
    showWarning('⚠️ ' + message + ' - 값이 복구되었습니다.');
    
    // 게임 일시정지
    if (window.gameState && window.gameState.gameRunning && !window.gameState.gamePaused) {
      const pauseBtn = document.getElementById('pauseBtn');
      if (pauseBtn) {
        pauseBtn.click();
      }
    }
  }

  /**
   * 경고 메시지 표시
   */
  function showWarning(message) {
    // 기존 경고가 있으면 제거
    const existingWarning = document.getElementById('security-warning');
    if (existingWarning) {
      existingWarning.remove();
    }
    
    // 새 경고 생성
    const warning = document.createElement('div');
    warning.id = 'security-warning';
    warning.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
      color: white;
      padding: 20px 40px;
      border-radius: 10px;
      border: 3px solid #fca5a5;
      font-size: 18px;
      font-weight: bold;
      z-index: 10000;
      box-shadow: 0 10px 40px rgba(0,0,0,0.5);
      animation: shake 0.5s;
    `;
    warning.textContent = '🚨 ' + message;
    document.body.appendChild(warning);
    
    // 3초 후 제거
    setTimeout(() => {
      warning.style.animation = 'fadeOut 0.5s';
      setTimeout(() => warning.remove(), 500);
    }, 3000);
  }

  /**
   * Object.freeze로 중요 객체 보호
   */
  function protectObjects() {
    // 일정 시간 후 weaponConfigs 보호 (초기화 후)
    setTimeout(() => {
      if (window.weaponConfigs) {
        // 깊은 복사 후 freeze
        window.weaponConfigs.forEach(weapon => {
          Object.freeze(weapon);
        });
        Object.freeze(window.weaponConfigs);
      }
      
      if (window.difficultySettings) {
        Object.freeze(window.difficultySettings.easy);
        Object.freeze(window.difficultySettings.normal);
        Object.freeze(window.difficultySettings.hard);
        Object.freeze(window.difficultySettings);
      }
    }, 1000);
  }

  /**
   * 디버거 감지
   */
  function detectDebugger() {
    setInterval(() => {
      const start = performance.now();
      debugger; // 디버거가 열려있으면 여기서 멈춤
      const end = performance.now();
      
      if (end - start > 100) {
        handleDevToolsOpen();
      }
    }, 1000);
  }

  /**
   * CSS 애니메이션 추가
   */
  function addSecurityStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shake {
        0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
        10%, 30%, 50%, 70%, 90% { transform: translate(-50%, -50%) rotate(-2deg); }
        20%, 40%, 60%, 80% { transform: translate(-50%, -50%) rotate(2deg); }
      }
      
      @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * 보안 시스템 초기화
   */
  function initSecurity() {
    console.log('🔒 보안 시스템 활성화');
    
    // 각 보안 기능 활성화
    preventDevTools();
    preventContextMenu();
    startIntegrityCheck();
    protectObjects();
    addSecurityStyles();
    
    // 개발자 도구 감지 (주기적)
    setInterval(detectDevTools, 1000);
    
    // 콘솔 감지
    detectConsole();
    
    // 디버거 감지 (선택적 - 성능 영향 있음)
    // detectDebugger();
    
    // 경고 메시지
    console.log('%c⚠️ 경고', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%c이 게임의 코드를 변조하거나 개발자 도구를 사용하면 감지됩니다.', 'color: orange; font-size: 14px;');
    console.log('%c정상적인 플레이를 권장합니다.', 'color: yellow; font-size: 14px;');
  }

  // DOM 로드 완료 시 초기화
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSecurity);
  } else {
    initSecurity();
  }

  // 페이지 언로드 시 정리
  window.addEventListener('beforeunload', () => {
    if (integrityCheck.checkInterval) {
      clearInterval(integrityCheck.checkInterval);
    }
  });

})();
