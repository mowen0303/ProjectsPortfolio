/*#1 supplier*/
create or replace type supplier_t as object (supplier_id number, name varchar2(20));
/

/*#2 item*/
create or replace type item_t as object (
	item_id number, 
	name varchar2(20), 
	price number(8,2),
	supplier ref supplier_t, 
	member function getiteminfo return varchar2
);
/

create or replace type body item_t as
	member function getiteminfo return varchar2 is 
	begin
		return self.name || ' ' || self.price;
	end;
end;
/

/*#3 building*/
create or replace type building_t as object (
	building_id number,
	name varchar2(30), 
	address varchar2(60)
);
/

/*#4 inventory*/
create or replace type inventory_t as object (
	inventory_id number,
	item ref item_t, 
	building ref building_t, 
	quantity number, 
	checkin_date date,
	checkout_date date, 
	member function quantityalert return varchar2,
	member function getinstockdays return number,
	order member function match(i inventory_t) return number
);
/

create or replace type body inventory_t as
	member function quantityalert return varchar2 is 
	begin
		if self.quantity < 5 then 
			return 'yes';
		else 
			return 'no';
		end if;
	end;
	member function getinstockdays return number is 
	begin
		return round(sysdate - self.checkin_date,0);
	end;
	order member function match(i inventory_t) return number is 
	begin
		if quantity < i.quantity then 
			return -1;
		elsif quantity > i.quantity then 
			return 1;
		else 
			return 0;
		end if;
	end;
end;
/

/*#5 employee*/
create or replace type employee_t as object (
	employee_id number, 
	firstname varchar2(15), 
	lastname varchar2(15),  
	birthday date, 
	map member function computingage return number, 
	member function fullname return varchar2
) not final;
/

create or replace type body employee_t as 
	map member function computingage return number is 
	begin
		return round((sysdate - self.birthday)/365,0);
	end;
	member function fullname return varchar2 is 
	begin
		return self.firstname||' '||self.lastname; 
	end;
end;
/

/*#6 driver*/
create or replace type driver_t under employee_t (driverlicense number, overriding member function fullname return varchar2);
/

create or replace type body driver_t as 
overriding member function fullname return varchar2 is 
	begin
		return self.lastname||' '||self.firstname; 
	end;
end;
/


/*#7 clerk*/
create or replace type clerk_t under employee_t (orderauthority number);
/

/*#8 manager*/
create or replace type manager_t under employee_t (
	startdate date, 
	member function getbonus return varchar2
);
/

create or replace type body manager_t as 
	member function getbonus return varchar2 is 
	begin
		if (round((sysdate - self.startdate)/365,0) > 2) then
			return self.employee_id||' gets a bonus.';
		else 
			return self.employee_id||' does not get a bonus.';
		end if;
	end;
end;
/


/*#9 car*/
create or replace type car_t as object(
	car_id number, 
	platenumber varchar2(6), 
	type varchar2(20), 
	status varchar2(20)
);
/

/*#10 shipment*/
create or replace type shipment_t as object (
	shipment_id number,
	subscriber ref clerk_t,
	driver ref driver_t,
	car ref car_t,
	order_date date,
	complete_date date,
	member function status return varchar2
)
/

create or replace type body shipment_t as 
	member function status return varchar2 is
	begin
		if (self.complete_date is null and floor(sysdate-self.order_date)<15) then
			return 'processing';
		elsif (self.complete_date is null and floor(sysdate-self.order_date)>=15) then
			return 'need to check';
		else 
			return 'complete';
		end if;
	end;
end;
/

/*#11 deliverItem*/
create or replace type deliveritem_t as object (
	deliveritem_id number,
	item ref item_t,
	shipment ref shipment_t,
	quantity number,
	pickup_building ref building_t,
	deliver_building ref building_t,
	pickup_date date,
	deliver_date date,
	member function getitemstaus return varchar2
);
/

create or replace type body deliveritem_t as
	member function getitemstaus return varchar2 is
	begin
		if(self.deliver_date is null) then
			return 'delivering';
		else
			return 'complete';
		end if;
	end;
end;
/

create table supplier of supplier_t (supplier_id primary key);
insert into supplier values('1','victer inc');
insert into supplier values('2','univers co');
insert into supplier values('3','logi inc');
insert into supplier values('4','canand inc');

create table item of item_t (item_id primary key);
insert into item values(item_t('1','apple','10',(select ref(s) from supplier s where s.supplier_id = '1')));
insert into item values(item_t('2','mango','5.5',(select ref(s) from supplier s where s.supplier_id = '2')));
insert into item values(item_t('3','miracle fruit','8.6',(select ref(s) from supplier s where s.supplier_id = '1')));
insert into item values(item_t('4','banana','10.6',(select ref(s) from supplier s where s.supplier_id = '3')));
insert into item values(item_t('5','coconut','100.5',(select ref(s) from supplier s where s.supplier_id = '4')));
insert into item values(item_t('6','plum','40.5',(select ref(s) from supplier s where s.supplier_id = '4')));
insert into item values(item_t('7','lychee','44.5',(select ref(s) from supplier s where s.supplier_id = '1')));
insert into item values(item_t('8','salak','213.15',(select ref(s) from supplier s where s.supplier_id = '3')));
insert into item values(item_t('9','kiwifruit','18.9',(select ref(s) from supplier s where s.supplier_id = '3')));
insert into item values(item_t('10','yuzu','810.50',(select ref(s) from supplier s where s.supplier_id = '3')));
insert into item values(item_t('11','Ambrosia apples','1500',(select ref(s) from supplier s where s.supplier_id = '1')));

create table building of building_t (building_id primary key);
insert into building values(building_t('1001','vari hall','198 york blvd, north york, on m3j'));
insert into building values(building_t('1002','department of psychology','4700 keele st, north york, on m3j 1p3'));
insert into building values(building_t('1003','ikea vaughan','200 interchange way, concord, on l4k 5c3'));
insert into building values(building_t('1004','walmart toronto downsview','3757 keele st, north york, on m3j 1n4'));
insert into building values(building_t('1005','oakdale village homes','114 jim baird mews, north york, on m3l 0c4'));
insert into building values(building_t('1006','riocan marketplace','81 gerry fitzgerald dr, north york, on m3j 3n2'));

create table inventory of inventory_t (inventory_id primary key);
insert into inventory values (inventory_t('01',(select ref(i) from item i where i.item_id = '1'),(select ref(b) from building b where b.building_id = '1001'),'31','05-oct-1987','05-oct-1987'));
insert into inventory values (inventory_t('02',(select ref(i) from item i where i.item_id = '2'),(select ref(b) from building b where b.building_id = '1002'),'964','06-jan-2010','06-jan-2010'));
insert into inventory values (inventory_t('03',(select ref(i) from item i where i.item_id = '3'),(select ref(b) from building b where b.building_id = '1002'),'75','27-oct-1987','27-oct-1987'));
insert into inventory values (inventory_t('04',(select ref(i) from item i where i.item_id = '4'),(select ref(b) from building b where b.building_id = '1003'),'3','16-oct-1987','16-oct-1987'));
insert into inventory values (inventory_t('05',(select ref(i) from item i where i.item_id = '5'),(select ref(b) from building b where b.building_id = '1004'),'73','21-oct-2001','21-oct-2001'));
insert into inventory values (inventory_t('06',(select ref(i) from item i where i.item_id = '6'),(select ref(b) from building b where b.building_id = '1003'),'30','05-oct-2000','05-oct-2000'));
insert into inventory values (inventory_t('07',(select ref(i) from item i where i.item_id = '7'),(select ref(b) from building b where b.building_id = '1002'),'100','25-oct-2010','25-oct-2010'));
insert into inventory values (inventory_t('08',(select ref(i) from item i where i.item_id = '8'),(select ref(b) from building b where b.building_id = '1004'),'1','21-oct-2010','21-oct-2010'));
insert into inventory values (inventory_t('09',(select ref(i) from item i where i.item_id = '9'),(select ref(b) from building b where b.building_id = '1003'),'13','21-jun-2010','21-jun-2010'));
insert into inventory values (inventory_t('10',(select ref(i) from item i where i.item_id = '10'),(select ref(b) from building b where b.building_id = '1001'),'43','1-sep-2010','24-sep-2010'));
insert into inventory values (inventory_t('11',(select ref(i) from item i where i.item_id = '11'),(select ref(b) from building b where b.building_id = '1001'),'43','1-sep-2010','24-sep-2010'));
insert into inventory values (inventory_t('12',(select ref(i) from item i where i.item_id = '1'),(select ref(b) from building b where b.building_id = '1002'),'1043','1-sep-2010','24-sep-2010'));
insert into inventory values (inventory_t('13',(select ref(i) from item i where i.item_id = '4'),(select ref(b) from building b where b.building_id = '1003'),'3','16-oct-2017','19-oct-2017'));
insert into inventory values (inventory_t('14',(select ref(i) from item i where i.item_id = '1'),(select ref(b) from building b where b.building_id = '1004'),'43','1-sep-2010','24-sep-2010'));

create table driver of driver_t (employee_id primary key);
insert into driver values(driver_t('000101', 'john', 'smith', '15-jun-1988',  '1230000001'));
insert into driver values(driver_t('000102', 'jane', 'do', '05-oct-1987', '1230000002'));
insert into driver values(driver_t('000103', 'jack', 'ngai', '08-mar-1978', '1230000003'));
insert into driver values(driver_t('000104', 'joan', 'pete', '27-jul-1988', '1230000004'));
insert into driver values(driver_t('000105', 'kitty', 'hello', '27-jul-1999', '1230000005'));

create table clerk of clerk_t (employee_id primary key);
insert into clerk values(clerk_t('000401', 'anna', 'banana', '15-jun-1988', '1'));
insert into clerk values(clerk_t('000402', 'brian', 'cu', '05-oct-1987', '1'));
insert into clerk values(clerk_t('000403', 'colleen', 'douglas', '08-mar-1978', '0'));
insert into clerk values(clerk_t('000404', 'david', 'esposito', '27-jul-1988', '0'));

create table manager of manager_t (employee_id primary key);
insert into manager values(manager_t('000301', 'apple', 'yi', '27-jul-1988', '31-aug-2011'));
insert into manager values(manager_t('000302', 'ibrahim', 'manjra', '05-oct-1987', '13-jun-2000'));
insert into manager values(manager_t('000303', 'donia', 'zhao', '08-mar-1978', '09-jul-2007'));
insert into manager values(manager_t('000304', 'ashley', 'amer', '27-jul-1988', '27-feb-2018'));

create table car of car_t(car_id primary key);
insert into car values(car_t('000001', 'a22b12', 'medium', 'available'));
insert into car values(car_t('000002', 'z54h89', 'medium', 'undermaintenance'));
insert into car values(car_t('000003', 'e09u34', 'small', 'available'));
insert into car values(car_t('000004', 't66w32', 'large', 'unavailable'));

create table shipment of shipment_t (shipment_id primary key);
insert into shipment values (shipment_t('01',(select ref(c) from clerk c where c.employee_id = '401'),(select ref(d) from driver d where d.employee_id = '101'),(select ref(c) from car c where c.car_id = '1'),'1-Jan-2017','29-Jan-2017'));
insert into shipment values (shipment_t('02',(select ref(c) from clerk c where c.employee_id = '402'),(select ref(d) from driver d where d.employee_id = '102'),(select ref(c) from car c where c.car_id = '2'),'3-Feb-2017','4-Feb-2017'));
insert into shipment values (shipment_t('03',(select ref(c) from clerk c where c.employee_id = '403'),(select ref(d) from driver d where d.employee_id = '103'),(select ref(c) from car c where c.car_id = '3'),'27-Mar-2017','29-Mar-2017'));
insert into shipment values (shipment_t('04',(select ref(c) from clerk c where c.employee_id = '404'),(select ref(d) from driver d where d.employee_id = '104'),(select ref(c) from car c where c.car_id = '1'),'17-May-2017','21-May-2017'));
insert into shipment values (shipment_t('05',(select ref(c) from clerk c where c.employee_id = '401'),(select ref(d) from driver d where d.employee_id = '102'),(select ref(c) from car c where c.car_id = '2'),'27-Sep-2017',''));

create table deliveritem of deliveritem_t (deliveritem_id primary key);
insert into deliveritem values (deliveritem_t('01',(select ref(t) from item t where t.item_id = '1'),(select ref(t) from shipment t where t.shipment_id = '1'),'3',(select ref(t) from building t where t.building_id = '1001'),(select ref(t) from building t where t.building_id = '1002'),'1-Jan-2017','2-Jan-2017'));
insert into deliveritem values (deliveritem_t('02',(select ref(t) from item t where t.item_id = '11'),(select ref(t) from shipment t where t.shipment_id = '1'),'4',(select ref(t) from building t where t.building_id = '1002'),(select ref(t) from building t where t.building_id = '1003'),'1-Jan-2017','2-Jan-2017'));
insert into deliveritem values (deliveritem_t('03',(select ref(t) from item t where t.item_id = '3'),(select ref(t) from shipment t where t.shipment_id = '2'),'2',(select ref(t) from building t where t.building_id = '1003'),(select ref(t) from building t where t.building_id = '1004'),'1-Jan-2017','2-Jan-2017'));
insert into deliveritem values (deliveritem_t('04',(select ref(t) from item t where t.item_id = '4'),(select ref(t) from shipment t where t.shipment_id = '3'),'4',(select ref(t) from building t where t.building_id = '1004'),(select ref(t) from building t where t.building_id = '1001'),'1-Jan-2017','2-Jan-2017'));
insert into deliveritem values (deliveritem_t('05',(select ref(t) from item t where t.item_id = '11'),(select ref(t) from shipment t where t.shipment_id = '4'),'4',(select ref(t) from building t where t.building_id = '1004'),(select ref(t) from building t where t.building_id = '1003'),'1-Jan-2017','2-Jan-2017'));
insert into deliveritem values (deliveritem_t('06',(select ref(t) from item t where t.item_id = '5'),(select ref(t) from shipment t where t.shipment_id = '4'),'4',(select ref(t) from building t where t.building_id = '1004'),(select ref(t) from building t where t.building_id = '1003'),'1-Jan-2017','2-Jan-2017'));
insert into deliveritem values (deliveritem_t('07',(select ref(t) from item t where t.item_id = '5'),(select ref(t) from shipment t where t.shipment_id = '4'),'4',(select ref(t) from building t where t.building_id = '1004'),(select ref(t) from building t where t.building_id = '1003'),'1-Jan-2000',''));
insert into deliveritem values (deliveritem_t('08',(select ref(t) from item t where t.item_id = '5'),(select ref(t) from shipment t where t.shipment_id = '4'),'4',(select ref(t) from building t where t.building_id = '1004'),(select ref(t) from building t where t.building_id = '1003'),'1-Feb-2018',''));
insert into deliveritem values (deliveritem_t('09',(select ref(t) from item t where t.item_id = '1'),(select ref(t) from shipment t where t.shipment_id = '2'),'50',(select ref(t) from building t where t.building_id = '1002'),(select ref(t) from building t where t.building_id = '1001'),'1-Feb-2018',''));
insert into deliveritem values (deliveritem_t('10',(select ref(t) from item t where t.item_id = '2'),(select ref(t) from shipment t where t.shipment_id = '1'),'50',(select ref(t) from building t where t.building_id = '1002'),(select ref(t) from building t where t.building_id = '1001'),'1-Feb-2018',''));

select OBJECT_NAME from user_objects;
desc SUPPLIER_T;
desc ITEM_T;
desc INVENTORY_T;
desc ITEM_T;
desc BUILDING_T;
desc INVENTORY_T;
desc EMPLOYEE_T;
desc EMPLOYEE_T;
desc DRIVER_T;
desc DRIVER_T;
desc CLERK_T;
desc MANAGER_T;
desc MANAGER_T;
desc CAR_T;
desc SHIPMENT_T;
desc SHIPMENT_T;
desc DELIVERITEM_T;
desc DELIVERITEM_T;

select * from tab;
desc SUPPLIER;
desc ITEM;
desc BUILDING;
desc inventory;
desc CAR;
desc DRIVER;
desc CLERK;
desc MANAGER;
desc SHIPMENT;
desc DELIVERITEM;


/*query*/
/*1.find the driver's licence of the driver who delivered Ambrosia apples (ItemName) to a Building 103.*/
select d.shipment.driver.driverlicense from deliveritem d where d.deliver_building.building_id = 1003 and d.item.name = 'Ambrosia apples';

/*2.find the license plate number of the car that delivered coconut(s)*/
select d.shipment.car.platenumber from deliveritem d where d.item.name = 'coconut';

/*3.(map) find the full name and age of the clerk that request the shipment order by age*/
select distinct d.shipment.subscriber.fullname() fullname,d.shipment.subscriber.computingAge() age from deliveritem d order by age;

/*4. find the item names,price and quantity stored in 'vari hall' 3 ordered by quantity*/
select i.item.name,i.item.price,i.quantity from inventory i where i.building.name = 'vari hall';

/*5. find the total value of apple stored in inventory*/
select sum(i.item.price*i.quantity) from inventory i where i.item.name = 'apple';

/*6. (override) find the driver's fullname who drives a small car to deliver item*/
select d.shipment.driver.fullname() from deliveritem d where d.shipment.car.type = 'small';

/*7. get all the item name, pickup building and desitnation building in shipment 01*/
select d.item.name,d.pickup_building.name,d.deliver_building.name from deliveritem d where d.shipment.shipment_id  = 1;

/*8. Find the building which stores the most of the apple*/
select i.item.name,i.building.name,i.quantity from inventory i where i.item.name = 'apple' and i.quantity = (select max(i.quantity) from inventory i where i.item.name = 'apple');

/*9. Find the building name, price, quantity and total price which supplier 'logi inc' deliver mange on 16-oct-2017*/
select i.building.name,i.quantity,i.item.price,(i.quantity*i.item.price) amount from inventory i where i.item.supplier.name = 'logi inc' and i.checkin_date = '16-oct-2017';

/*10. find all the buildings that have less than 50 apples*/
select i.building.name,i.quantity from inventory i where i.quantity<50 and i.item.name = 'apple';

/*11. find all the deliver times for each driver */
select s.driver.fullname() fullname,count(s.shipment_id) deliver_times from shipment s group by s.driver.fullname() order by deliver_times desc;

/*12. Find deliver item name which delivered within 2 years*/
select d.item.name, d.deliver_date from deliveritem d where floor(sysdate-d.deliver_date)<=2*365;

/*13. Find the most delivered item name, price, quantity and it's supplier*/
select d.item.name, d.item.price, d.quantity,d.item.supplier.name from deliveritem d where d.quantity = (select max(d.quantity) from deliveritem d);

/*14. Find all item list and it's total price which are delivering*/
select d.item.name,d.item.price*d.quantity amount,d.getitemstaus() status from deliveritem d where d.getitemstaus() = 'delivering' order by amount desc;

--15. Find the quantity of apple which is picked up at building 1 by Jane Do
select d.item.name, d.quantity from deliveritem d where d.item.name = 'apple' and d.deliver_building.building_id = 1001 and d.shipment.driver.fullname() = 'do jane';

--16. Find the total price of mango which is checked in by the clerk 'anna banana'
select d.item.name,d.item.price*d.quantity amount from deliveritem d where d.shipment.subscriber.fullname() = 'anna banana' and d.item.name = 'mango';

--17.(order member function) compare all inventory quantity with the first inventory quantity. If the quantity more than first one, return 1, if it's equal the first one return 0. otherwise return -1
select i.item.name,i.match((select value(i) from inventory i where i.inventory_id =1)) match from inventory i order by value(match) desc;

