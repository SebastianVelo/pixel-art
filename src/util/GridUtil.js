import $ from "jquery";
import { getId, getClass, getProperty } from "../util/JQueryUtil";
import CanvasCfg from "../classes/CanvasCfg";

const canvasCfg = new CanvasCfg();
const getCellId = (x, y, gridId) => gridId + x + "-" + y;
const getCellClass = (gridId) => canvasCfg.htmlSettings.classCell + gridId;


/* Sets a white backgroundColor in canvas */
function resetCanvas() {
    $(getClass(canvasCfg.htmlSettings.classCellCanvas)).css("background-color", "white");
}

/* Returns the last cellId without backgroundColor */
function getLastCellIDSavedColors() {
    let cells = $(getProperty("owner", canvasCfg.htmlSettings.idSavedColors));
    let index = 0;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].style.backgroundColor.length === 0) {
            index = i;
            break;
        }
    }
    return cells[index].id;
}

/* modifies values in the website with the grid in props and calls setCellSize() */
function setGridSize(grid) {
    let setInFront = (range, label, axis) => {
        let value = grid[axis];
        $(getId(label)).text(value);
        $(getId(range)).val(value);
    };
    setInFront(canvasCfg.row.range, canvasCfg.row.label, "rows");
    setInFront(canvasCfg.column.range, canvasCfg.column.label, "columns");
    setInFront(canvasCfg.cellSize.range, canvasCfg.cellSize.label, "size");
    setInFront(canvasCfg.border.range, canvasCfg.border.label, "border");
    setCellSize(grid);
}

/* Modifies the width and height of cells with the grid in props */
function setCellSize(grid) {
    $(getClass(canvasCfg.htmlSettings.classCellCanvas)).css("width", grid.size);
    $(getClass(canvasCfg.htmlSettings.classCellCanvas)).css("height", grid.size);
    $(getClass(canvasCfg.htmlSettings.classCellCanvas)).css("border", grid.border + "px solid black");
}

export {
    canvasCfg,
    getCellId, getCellClass,
    resetCanvas, getLastCellIDSavedColors,
    setCellSize, setGridSize
};