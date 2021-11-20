var colorsBlue = "04080f-507dbc-a1c6ea-bbd1ea-dae3e5".split("-").map(a=>"#"+a)
var colorsRed = "fe7f2d-fcca46-a1c181-619b8a-333".split("-").map(a=>"#"+a)
function planet(x,y,r=30){
	
	push()
		translate(x,y)
		let lastX, lastR, lastAng
		for(var i=0;i<130;i++){
			let cc = color(colorsBlue[int(noise(frameCount/10,i)*colorsBlue.length)%colorsBlue.length])
			cc.setAlpha(150)
			fill(cc)
			noStroke()
			let shadowCC = color(cc)
			shadowCC.setAlpha(255)
			drawingContext.shadowColor = shadowCC;
			drawingContext.shadowBlur =30;
			let xx = noise(i*2,frameCount/100+mouseX/500)*r*noise(i)*2
			let ang = noise(i,frameCount/800+mouseY/1000,500)*10*PI
			let rr = noise(i,500,frameCount/50+mouseY/500)*50*(15/(sqrt(xx)+1))
			ellipse(xx*cos(ang),xx*sin(ang),rr)
			if (lastX && random()<0.1){
				push()
				stroke(255,50)
				line(xx*cos(ang),xx*sin(ang),lastX*cos(lastAng),lastX*sin(lastAng))
				pop()
			}
			
			
			let cc2 = colorsRed[int(noise(frameCount/10,i)*colorsBlue.length)%colorsBlue.length]
			fill(cc2)
			
			drawingContext.shadowColor = color(cc2);
			drawingContext.shadowBlur =10;
			push()
			rectMode(CENTER)
				translate(xx*cos(ang*2),xx*sin(ang*2))
				rotate(ang*2)
				rotate(i)
				rect(0,0,sqrt(rr)*sin(frameCount/2+i)*2)
			pop()
			
			lastX=xx
			lastR=rr
			lastAng=ang
			
			if (random()<0.5){
				push()
				stroke(cc2)
				noFill()
				arc(0,0,xx*2,xx*2,ang*2,ang*2+noise(i,frameCount/200))
				pop()
			}
		}
	pop()
}
var overAllTexture
function setup() {
	
	createCanvas(800,800);
	overAllTexture=createGraphics(width,height)
	overAllTexture.loadPixels()
	// noStroke()
	for(var i=0;i<width+50;i++){
		for(var o=0;o<height+50;o++){
			overAllTexture.set(i,o,color(100,noise(i/3,o/3,i*o/50)*random([0,10,20])))
		}
	}
	overAllTexture.updatePixels()
	background(100);
	blendMode(SCREEN)
	// planet(width/2,height/2,100)
}

function draw() {
	blendMode(BLEND)
	// background(0,20)
	// background(colorsBlue[0])
	fill(4, 11, 60,60)
	noStroke()
	rect(0,0,width,height)
	blendMode(SCREEN)
	planet(width/2,height/2,380)
	
	push()
		blendMode(MULTIPLY)
		image(overAllTexture,0,0)
	pop()
	stroke(255,50)

	blendMode(MULTIPLY)
	for(var i=0;i<width;i+=100){
		fill(230,map(i,width/2,width,0,20))
		ellipse(width/2,height/2,pow(i,0.9)*3,pow(i,0.9)*3)
	}
	blendMode(BLEND)
	stroke(colorsRed[1])
	push()
	for(var i=0;i<width;i+=10){
		line(i,40,i,45+(i/10%5==0?15:0))
		line(40,i,45+(i/10%5==0?15:0),i)
		point(i,i)
		// rotate(-0.0005)
	}
	pop()
	noFill()
		strokeWeight(5)
	drawingContext.shadowColor = colorsRed[1];
	drawingContext.shadowBlur =30;
	for(var i=0;i<5;i++){
		let aa =  noise(i,frameCount/10)*2
		arc(width/2,height/2,width-100-i*20,height-100-i*20,aa,aa + noise(i,frameCount/10)/2)
	}
	drawingContext.shadowBlur =0;
	
	strokeWeight(2)
	// ellipse(mouseX, mouseY, 20, 20);
}