# DoBeeDo Session Notes

## Last Session: 2025-01-19 - Mobile Touch Drag-and-Drop

### What Was Completed

**✅ Fixed mobile/touch drag-and-drop functionality**
- **Problem**: Drag-and-drop worked on desktop but not on mobile devices
- **Root Cause**: Chrome browser was treating touch events on task cards as scroll gestures, marking them as `cancelable=false` which prevented `preventDefault()` from working
- **Solution**: Added `touch-action: none` to `.task-card` CSS to tell browser not to treat touches as scroll gestures
- **Additional Fixes**:
  - Used `shadowRoot.elementsFromPoint()` instead of `document.elementsFromPoint()` for proper web component hit testing
  - Temporarily hide dragging element during hit tests so query can see through it
  - Added proper touch event listener cleanup in `disconnectedCallback()`

**✅ Debugging Process**
- Initially tried USB debugging on Samsung phone with Linux (had authorization issues)
- Pivoted to on-screen debug overlay (better UX)
- Debug overlay revealed "no column found" during touch move
- Got ADB working, console revealed critical Chrome intervention error
- Applied `touch-action: none` fix - immediately resolved the issue
- Removed all debug code after successful fix

**✅ Documentation Updated**
- Updated CLAUDE.md roadmap: drag-and-drop now marked as working on "desktop and mobile/touch"
- Added "Touch drag-and-drop" section to Frontend Conventions with key patterns for future reference
- All changes committed and pushed

### Technical Insights Learned

**CSS `touch-action` property**: Critical for custom touch interactions
- `touch-action: none` prevents browser from applying default touch behaviors (scroll, pan, zoom)
- Without this, browser marks touch events as non-cancelable for performance
- Standard solution for custom drag implementations on mobile

**Shadow DOM hit testing**: Web components need special handling
- Must use `shadowRoot.elementsFromPoint()` not `document.elementsFromPoint()`
- Shadow boundary prevents document-level queries from seeing inside

**Element visibility trick**: Hide dragging element during hit test
- Dragging element blocks hit test queries
- Temporarily set `visibility: hidden` during query, then restore
- Works better than `pointer-events: none` for this use case

### Current State

- All core kanban features working on both desktop and mobile
- Drag-and-drop fully functional with visual feedback
- Clean codebase (all debug code removed)
- Ready for next features

### Files Modified This Session

- `frontend/src/panel/dobee-do-panel.ts` - Touch handlers and CSS
- `custom_components/dobeedo/www/dobee-do-panel.js` - Built output
- `CLAUDE.md` - Updated documentation

### Next Session Ideas

Potential areas to work on next:
- **Subtasks/Checklists**: Model is defined in `model.py`, needs to be wired through API and UI
- **Entity Linking**: Model supports it, needs UI for selecting entities and defining auto-complete conditions
- **Task Filtering/Search**: UI for filtering tasks by tag, assignee, due date, etc.
- **Task Archiving**: Archive completed tasks instead of deleting
- **Lovelace Cards**: Create custom cards for dashboards
- **Board Import/Export**: Backup and restore boards as JSON
- **Task Comments**: Add commenting system (model supports it)
- **Column WIP Limits**: Visual warnings when column has too many tasks
- **Task Assignment to HA Users**: Currently free-text, could add user picker

### Important Context for Next AI Session

**Touch Drag Pattern (if needed elsewhere)**:
```typescript
// 1. CSS on draggable element
touch-action: none;

// 2. Touch listeners with passive: false
document.addEventListener('touchmove', handler, { passive: false });

// 3. Hit testing in web components
const elements = this.shadowRoot?.elementsFromPoint(x, y);

// 4. Hide dragging element during hit test
draggingEl.style.visibility = 'hidden';
const elements = elementsFromPoint(...);
draggingEl.style.visibility = 'visible';

// 5. Clean up listeners
document.removeEventListener('touchmove', handler);
```

**Testing Mobile Changes**:
- User has Home Assistant running with DoBeeDo installed
- Frontend builds to `custom_components/dobeedo/www/dobee-do-panel.js`
- After build, requires Home Assistant restart to clear browser cache on mobile
- Hard refresh doesn't always work on mobile browsers

**Project Architecture Reminder**:
- Backend: Python custom component in `custom_components/dobeedo/`
- Frontend: TypeScript/Lit in `frontend/src/`
- State manager: `DobeeDoManager` in `coordinator.py`
- WebSocket API: `api.py`
- Persistence: `storage.py` using HA's storage helper
- All changes auto-save to storage
