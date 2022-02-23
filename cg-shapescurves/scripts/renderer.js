class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }

    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        //left bottom point
        let x1 = 100;
        let y1 = 100;
        //right top point
        let x2 = 700;
        let y2 = 500;

        this.drawRectangle({ x: x1, y: y1 }, { x: x2, y: y2 }, [150, 150, 0, 255], ctx);
        // If the show points checkbox is true then draw all the circles showing the locations of all the vertexes.
        if (this.show_points === true) {
            this.drawCircle({ x: x1, y: y1 }, 10, [0, 0, 102, 255], ctx);
            this.drawCircle({ x: x2, y: y2 }, 10, [0, 0, 102, 255], ctx);
            this.drawCircle({ x: x1, y: y2 }, 10, [0, 0, 102, 255], ctx);
            this.drawCircle({ x: x2, y: y1 }, 10, [0, 0, 102, 255], ctx);
        }
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        let centerX = 400;
        let centerY = 300;
        let radius = 200;

        this.drawCircle({ x: centerX, y: centerY }, radius, [75, 0, 150, 255], ctx);
        // If the show points checkbox is true then draw all the rectangles showing the locations of all the vertexes.
        if (this.show_points === true) {
            let point = 0;
            for (let i = 0; i < this.num_curve_sections; i++) {
                let x = centerX + radius * Math.cos(point);
                let y = centerY + radius * Math.sin(point);
                point = point + (360 / this.num_curve_sections) * Math.PI / 180;

                this.drawRectangle({x: x-5, y: y-5}, {x: x+5, y: y+5}, [0,0,255,255], ctx);
            }
        }
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        /*
        Points plotted for curve. 
        Pt0 and Pt3 = Endpoints of the curve
        Pt1 and Pt2 = Points that influence how big the curve is
        */
        let pt0X = 5;
        let pt0Y = 300;
        let pt1X = 300;
        let pt1Y = 600;
        let pt2X = 500;
        let pt2Y = 50;
        let pt3X = 795;
        let pt3Y = 300;

        this.drawBezierCurve({ x: pt0X, y: pt0Y }, { x: pt1X, y: pt1Y }, { x: pt2X, y: pt2Y }, { x: pt3X, y: pt3Y }, [255, 0, 0, 255], ctx);
        // If the show points checkbox is true then draw all the circles showing the locations of all the vertexes
        if (this.show_points === true) {
            let t = 0;
            for (let i = 0; i <= this.num_curve_sections; i++) {
                // calculate the x and y location of the point to plot of the current t
                let x = Math.pow((1 - t), 3) * pt0X + 3 * Math.pow((1 - t), 2) * t * pt1X + 3 * (1 - t) * Math.pow(t, 2) * pt2X + Math.pow(t, 3) * pt3X;
                let y = Math.pow((1 - t), 3) * pt0Y + 3 * Math.pow((1 - t), 2) * t * pt1Y + 3 * (1 - t) * Math.pow(t, 2) * pt2Y + Math.pow(t, 3) * pt3Y;
                // update t to point to the next vertex to plot
                t = t + 1.0 / this.num_curve_sections;
                this.drawCircle({x:x, y:y}, 8, [0,100,0,255], ctx);
            }
        }

    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        // Name using combination of all three above shapes
        let color = [0,0,150,255];

        // Letter T
        this.drawLine({x: 20, y: 410}, {x: 20, y: 380},color, ctx);
        this.drawLine({x: 20, y: 380}, {x: 80, y: 380},color, ctx);
        this.drawBezierCurve({x: 80, y: 380}, {x: 80, y: 380}, {x: 100,y: 300}, {x: 80, y: 200},color, ctx);
        this.drawLine({x: 80, y: 200}, {x: 140, y: 200},color, ctx);
        this.drawBezierCurve({x: 140, y: 200}, {x: 140, y:200 }, {x: 100,y: 300}, {x:130 , y: 380},color, ctx);
        this.drawLine({x: 130, y: 380}, {x: 190, y: 380},color, ctx);
        this.drawLine({x: 190, y: 380}, {x: 190, y: 410},color, ctx);
        this.drawLine({x: 190, y: 410}, {x: 20, y: 410},color, ctx);

        // Letter U
        this.drawLine({x: 180, y: 340}, {x: 180, y: 240},color, ctx);
        this.drawBezierCurve({x: 180, y: 240}, {x: 190, y:210 }, {x: 270,y: 210}, {x:280 , y: 240},color, ctx);
        this.drawLine({x: 280, y: 240}, {x: 280, y: 200}, color, ctx);
        this.drawLine({x: 280, y: 200}, {x: 300, y: 200}, color, ctx);
        this.drawLine({x: 300, y: 200}, {x: 300, y: 340}, color, ctx);
        this.drawLine({x: 300, y: 340}, {x: 280, y: 340}, color, ctx);
        this.drawBezierCurve({x: 280, y: 340}, {x: 270, y:220 }, {x: 190,y: 220}, {x:200 , y: 340},color, ctx);
        this.drawLine({x: 200, y: 340}, {x: 180, y: 340}, color, ctx);

        // Letter C
        this.drawBezierCurve({x: 410, y: 340}, {x: 310, y: 330}, {x: 310,y: 210}, {x:410 , y: 200},color, ctx);
        this.drawBezierCurve({x: 410, y: 200}, {x: 415, y: 199}, {x: 425,y: 199}, {x: 430, y: 200},color, ctx);
        this.drawLine({x: 430, y: 200}, {x: 425, y: 220}, color, ctx);
        this.drawBezierCurve({x: 425, y: 220}, {x: 325, y: 220}, {x: 325,y: 330}, {x: 425, y: 320},color, ctx);
        this.drawLine({x: 425, y: 320}, {x: 420, y: 340}, color, ctx);
        this.drawLine({x: 420, y: 340}, {x: 410, y: 340}, color, ctx);

        // Letter K
        this.drawLine({x: 460, y: 410}, {x: 460, y: 200}, color, ctx);
        this.drawLine({x: 460, y: 200}, {x: 480, y: 200}, color, ctx);
        this.drawBezierCurve({x: 480, y: 200}, {x: 480, y: 340}, {x: 480,y: 340}, {x: 550, y: 200},color, ctx);
        this.drawLine({x: 550, y: 200}, {x: 570, y: 200}, color, ctx);
        this.drawBezierCurve({x: 570, y: 200}, {x: 480, y: 330}, {x: 480,y: 330}, {x: 570, y: 410},color, ctx);
        this.drawLine({x: 570, y: 410}, {x: 550, y: 410}, color, ctx);
        this.drawBezierCurve({x: 550, y: 410}, {x: 480, y: 330}, {x: 480,y: 330}, {x: 480, y: 410},color, ctx);
        this.drawLine({x: 480, y: 410}, {x: 460, y: 410}, color, ctx);

        // Letter E
        //Plan use circle and then use arch to erase part of it
        this.drawBezierCurve({x: 670, y: 275}, {x: 650, y: 330}, {x: 600,y: 330}, {x: 580, y: 280},color, ctx);
        this.drawBezierCurve({x: 580, y: 280}, {x: 570, y: 160}, {x: 670,y: 210}, {x: 670, y: 230},color, ctx);
        this.drawLine({x: 670, y: 230}, {x: 655, y: 240}, color, ctx);
        this.drawBezierCurve({x: 655, y: 240}, {x: 655, y: 230}, {x: 590,y: 180}, {x: 600, y: 275},color, ctx);
        this.drawLine({x: 600, y: 285}, {x: 650, y: 285}, color, ctx);
        this.drawBezierCurve({x: 600, y: 285}, {x: 620, y: 310}, {x: 630,y: 310}, {x: 650, y: 285},color, ctx);
        this.drawLine({x: 600, y: 275}, {x: 670, y: 275}, color, ctx);

        // Letter R
        this.drawLine({x: 700, y: 200}, {x: 700, y: 320}, color, ctx);
        this.drawLine({x: 700, y: 320}, {x: 720, y: 320}, color, ctx);
        this.drawLine({x: 720, y: 320}, {x: 720, y: 300}, color, ctx);
        this.drawBezierCurve({x: 720, y: 300}, {x: 730, y: 330}, {x: 770,y: 290}, {x: 780, y: 270},color, ctx);
        this.drawLine({x: 780, y: 270}, {x: 760, y: 260}, color, ctx);
        this.drawBezierCurve({x: 760, y: 260}, {x: 770, y: 290}, {x: 720,y: 290}, {x: 720, y: 270},color, ctx);
        this.drawLine({x: 720, y: 270}, {x: 720, y: 200}, color, ctx);
        this.drawLine({x: 720, y: 200}, {x: 700, y: 200}, color, ctx);

        // Happy Face
        this.drawCircle({x: 400,y: 500}, 80, color, ctx);
        this.drawCircle({x: 420,y: 520}, 10, color, ctx);
        this.drawCircle({x: 380,y: 520}, 10, color, ctx);
        this.drawBezierCurve({x: 340, y: 510}, {x: 360, y: 450}, {x: 430,y: 450}, {x: 460, y: 510},color, ctx);


    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        // Draw the rectangle based upon being given the left bottom and right top vertexes. 
        this.drawLine(left_bottom, { x: right_top.x, y: left_bottom.y }, color, ctx);
        this.drawLine({ x: right_top.x, y: left_bottom.y }, right_top, color, ctx);
        this.drawLine(right_top, { x: left_bottom.x, y: right_top.y }, color, ctx);
        this.drawLine({ x: left_bottom.x, y: right_top.y }, left_bottom, color, ctx);

        //To get the points to show up need to create a conditional that if true when the box
        // is checked that it will draw all the points defined within the draw(???) function
        // when there is a loop involved all I need to do is insert the conditional within the loop
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        // Generate all lines that make up a polygon resembling a circle from the 
        // given radius and center. 
        let radii = 0;
        for (let i = 0; i <= this.num_curve_sections; i++) {
            // Calculate the first x and y given the current radii. 
            let x = center.x + radius * Math.cos(radii);
            let y = center.y + radius * Math.sin(radii);
            // Update radii to point to next x and y
            radii = radii + (360 / this.num_curve_sections) * Math.PI / 180;
            // Calculate the next x and y at the newly updated radii.
            let x1 = center.x + radius * Math.cos(radii);
            let y1 = center.y + radius * Math.sin(radii);
            // Draw the line to connect the two found points.
            this.drawLine({ x: x, y: y }, { x: x1, y: y1 }, color, ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let t = 0;
        for (let i = 0; i < this.num_curve_sections; i++) {
            // Calculate the first x and y based on the current t.
            let x = Math.pow((1 - t), 3) * pt0.x + 3 * Math.pow((1 - t), 2) * t * pt1.x + 3 * (1 - t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x;
            let y = Math.pow((1 - t), 3) * pt0.y + 3 * Math.pow((1 - t), 2) * t * pt1.y + 3 * (1 - t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y;
            // Update t in order to find the next x and y.
            t = t + 1.0 / this.num_curve_sections;
            // Calculate the next x and y based on the new t.
            let x1 = Math.pow((1 - t), 3) * pt0.x + 3 * Math.pow((1 - t), 2) * t * pt1.x + 3 * (1 - t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x;
            let y1 = Math.pow((1 - t), 3) * pt0.y + 3 * Math.pow((1 - t), 2) * t * pt1.y + 3 * (1 - t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y;
            // Draw the line connecting the two found points. 
            this.drawLine({ x: x, y: y }, { x: x1, y: y1 }, color, ctx);
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx) {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3] / 255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
