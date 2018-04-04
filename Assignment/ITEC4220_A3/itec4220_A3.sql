---------------------------------------
---------------------------------------
----------------- XSU -----------------
---------------------------------------
---------------------------------------

--3.(XSU)Display the Employee information of the driver that drives a medium sized car.
OracleXML getXML\
-user "grp6/here4grp6"\
-conn "jdbc:oracle:thin:@sit.yorku.ca:1521:studb10g"\
-rowsetTag "deliverInfo"\
-rowTag "driver" \
-rowIdAttr "count" \
"select d.shipment.driver.lastname as lastname,d.shipment.driver.firstname as firstname,d.shipment.driver.driverlicense as driverLicense from deliveritem d where d.shipment.car.type = 'medium'";

--6.(XSU)List all shipping details from Shipment when clerks search for shipment information.
OracleXML getXML\
-user "grp6/here4grp6"\
-conn "jdbc:oracle:thin:@sit.yorku.ca:1521:studb10g"\
-rowsetTag "shipmentInfo"\
-rowTag "shipment" \
-rowIdAttr "count" \
"select d.shipment_ID as shipmentID, d.driver.employee_id as driverID, d.driver.fullname() as driverName, d.car.platenumber as carLicensePlate, d.order_date as orderDate,d.complete_date as completeDate,d.status() as status from shipment d";

--11.(XSU) Display the Driver information associated with Shipment ID “1”. 
OracleXML getXML\
-user "grp6/here4grp6" \
-conn "jdbc:oracle:thin:@sit.yorku.ca:1521:studb10g" \
-rowsetTag "inventoryList"\
-rowTag "itemInfo" \
"select d.driver.employee_id as ID, d.driver.firstname firstname, d.driver.lastname as lastname from shipment d where d.shipment_id = 1";

--16.(XSU) Display the Item information that was delivered by a small Car.
OracleXML getXML\
-user "grp6/here4grp6" \
-conn "jdbc:oracle:thin:@sit.yorku.ca:1521:studb10g" \
-rowsetTag "inventoryList"\
-rowTag "itemInfo" \
"select d.item.name as itemName, d.item.price as itemPrice, d.item.item_id as itemID from deliveritem d where d.shipment.car.type = 'small'";

--18.(XSU)Display the Inventory information of the Item “plum”.
OracleXML getXML\
-user "grp6/here4grp6" \
-conn "jdbc:oracle:thin:@sit.yorku.ca:1521:studb10g" \
-rowsetTag "deliverInfo"\
-rowTag "driver" \
-rowIdAttr "count" \
"select d.item.item_id as itemId, d.item.price as itemPrice, d.item.name as Name from inventory d where d.item.name='plum'";




set echo on
set long 32000
set pagesize 60

---------------------------------------
---------------------------------------
----------- Query Statement  ----------
---------------------------------------
---------------------------------------

--[Jerry Part]

--1.Display the delivery information (DeliverItem) of Items that were checked-in by the Clerk "Anna Banana" and group by Item name.
select xmlroot(xmlelement("deliver",xmlagg(xmlelement("deliveritemlist",xmlattributes(d.item.name as "itemName"),xmlagg(xmlelement("deliverItem",xmlattributes(d.deliveritem_id as "deliverItemID"),xmlelement("item",xmlforest(d.item.name as "itemName",d.quantity as "quantity",d.item.price as "price")),xmlelement("building",xmlforest(d.deliver_building.building_id as "id",d.deliver_building.name as "name")),xmlforest(d.pickup_date)))))),version '1.0', standalone yes) as result from deliveritem d where d.shipment.subscriber.fullname() = 'anna banana' group by d.item.name;

--2.Display the Employee information of the driver that delivered Ambrosia apples
select xmlroot(xmlelement("deliverDeliverAmbrosiaApples",xmlelement("driverList",xmlagg(xmlelement("driver",xmlattributes(d.shipment.driver.employee_id as "employeeID"),xmlelement("name",xmlforest(d.shipment.driver.firstName as "firstName", d.shipment.driver.lastName as "lastName")),xmlelement("driverLicense",d.shipment.driver.driverlicense))))),version '1.0', standalone yes) as result from deliverItem d where d.item.name = 'Ambrosia apples';

--4.Display the information of the Items delivered by Driver "smith john".
select xmlroot(xmlelement("deliverItemList",xmlagg(xmlelement("deliverItem",xmlattributes(d.deliveritem_id as "deliverID"),xmlelement("item",xmlforest(d.item.item_id as "id",d.item.name as "name",d.item.price as "price")),xmlelement("supplier",xmlforest(d.item.supplier.supplier_id as "id",d.item.supplier.name as "name"))))),version '1.0', standalone yes) as result from deliverItem d where d.shipment.driver.fullname() = 'smith john';

--[Kristen Part]

--5.Display all the information from Shipment and group them by Driver ID.
select xmlroot(xmlelement("shipmentInfo", xmlagg(xmlelement("shipmentList", xmlattributes(d.driver.employee_id as driverID),xmlagg(xmlelement("shipment",xmlforest(d.driver.fullname() as "driverName", d.car.platenumber as "carLicensePlate", d.order_date as "orderDate",d.complete_date as "completeDate",d.status() as "status")))))), version '1.0', standalone yes) as result from shipment d group by d.driver.employee_id;

--7.Display Building information in the Inventory which stores apples.
select xmlroot(xmlelement("apple",(xmlelement("inventory",xmlagg(xmlelement("building",xmlforest(i.building.building_id as "buildingID",i.building.name as "buildingName",i.building.address as "address")))))),version '1.0', standalone yes) as result from inventory i where i.item.name = 'apple';

--8.List all personal information of manager who gets bonus.
select xmlroot(xmlelement("employee",(xmlelement("manager",xmlagg(xmlelement("personalInfo",xmlforest(d.employee_id as "managerID",d.firstname as "firstName", d.lastname as "lastName", d.birthDay as "birthday")))))), version '1.0', standalone yes) as result from manager d where round((sysdate - d.startdate)/365) > 2;

--[Eva Part]

--9.Display all Cars that have been used for shipment and are currently available and group by Shipment ID. *note: this doesn’t group anything, maybe change car_id = 3’s shipment_id to “1”. 
select
xmlroot(xmlelement("availableCars", xmlagg(xmlelement("shipmentUsed", xmlattributes(d.shipment_id as SID),xmlagg(xmlelement("cars",xmlforest(d.car.car_id as "ID", d.car.platenumber as "plateNumber", d.car.type as "type")))))), version '1.0', standalone yes) as result from shipment d where d.car.status = 'available' group by d.shipment_id;

--10.Display the delivered item information where the item is delivered to building #1001. 
select
xmlroot(xmlelement("building1001", (xmlelement("inventory", xmlagg(xmlelement("fruits", xmlforest(d.item.item_id as "ID", d.item.name as "name", d.item.price as "price")))))), version '1.0', standalone yes) as result from deliveritem d where d.deliver_building.building_id = 1001;

--12.Display all the Item’s ID and name that has a quantity of less than 5. 
select
xmlroot(xmlelement("inventory", xmlagg(xmlelement("fruits", xmlforest(d.item.item_id as "ID", d.item.name as "name")))), version '1.0', standalone yes) as result from inventory d where d.quantity < 5

--[Effy Part]

--13.(Group By) Display all the Item information available in the inventory and group by Building ID.
select
xmlroot(xmlelement("inventoryInfo",xmlagg(xmlelement("inventoryList",
xmlattributes(i.building.building_id as buildingID),
xmlagg(xmlelement("inventory",xmlforest(i.item.item_id as "id",
i.item.name as "name", i.item.price as "price", i.quantity as "quantity",
i.building.building_id as "buildingID", i.building.name as "buildingName",
i.checkin_date,i.checkout_date)))))),  version'1.0', standalone yes)
as result from inventory i group by i.building.building_id;

--14.List the item names,price and quantity stored in 'vari hall'
select
xmlroot(xmlelement("inventory",(xmlelement("itemInfo",
xmlagg(xmlelement("item", xmlforest(i.item.name as "itemName",
i.item.price as "itemPrice", i.quantity as "quantity")))))),
version'1.0', standalone yes) as result from inventory i where i.building.name='vari hall';

--15.Display the shipment information which the shipment order is completed on 29-Mar-2017.
select 
xmlroot(xmlelement("trackingShipment",(xmlelement("shipmentInfo",
xmlagg(xmlelement("shipment",xmlforest(s.shipment_id as "shipmentID",
s.subscriber.fullname() as "clerkName", s.driver.fullname() as "driverName",
s.car.platenumber as "platenumber", s.car.type as "carType", s.order_date,s.complete_date)))))),
version'1.0', standalone yes) as result from shipment s where s.complete_date = '29-Mar-2017';

--[Peter Part]

--17.(Group By) Display Item ID, name and its quantity stored in Building #1001 group by check-in date.
select xmlroot(xmlelement("inventory", xmlagg(xmlelement("Item", xmlattributes(i.checkin_date as checkinDate),xmlagg(xmlelement("Info",xmlforest(i.item.name as "itemName", i.item.price as "itemPrice", i.quantity as "quantity")))))), version '1.0', standalone yes) as result from inventory i where i.building.building_id= 1001 group by i.checkin_date;

--19.Display the building address where the mango was delivered to. 
select xmlroot(xmlelement("mango",(xmlelement("delivery",xmlagg(xmlelement("address",xmlforest(d.deliver_building.building_id as "ID", d.deliver_building.name as "Name", d.deliver_building.address as "address")))))), version '1.0', standalone yes)as result from deliveritem d where d.item.name = 'mango';

--20.splay all the Item information supplied by Supplier Victer Inc”
select xmlroot(xmlelement("Supplier",(xmlelement("item",xmlagg(xmlelement("information",xmlforest(d.item_id as "ID", d.name as "Name", d.price as "price")))))), version '1.0', standalone yes)as result from item d where d.supplier.name = 'victer inc';

---------------------------------------
---------------------------------------
---- creat folder named myfolder  -----
---------------------------------------
---------------------------------------
declare
ret boolean;
begin 
ret := dbms_xdb.createfolder('/public/myfolder2');
commit; 
end; 
/

---------------------------------------
---------------------------------------
---------- creat xml file  ------------
---------------------------------------
---------------------------------------
declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/jerry1.xml',
'
<deliver>
   <deliveritemlist>
      <deliveritem deliverItemID="2">
         <item>
            <itemName>Ambrosia apples</itemName>
            <quantity>4</quantity>
            <price>1500</price>
         </item>
         <building>
            <id>1003</id>
            <name>ikea vaughan</name>
         </building>
         <PICKUP_DATE>2017-01-01</PICKUP_DATE>
      </deliveritem>
      <deliveritem deliverItemID="3">
         <item>
            <itemName>Ambrosia apples</itemName>
            <quantity>14</quantity>
            <price>1500</price>
         </item>
         <building>
            <id>1003</id>
            <name>ikea vaughan</name>
         </building>
         <PICKUP_DATE>2017-01-02</PICKUP_DATE>
      </deliveritem>
   </deliveritemlist>
   <deliveritemlist>
      <deliveritem deliverItemID="1">
         <item>
            <itemName>apple</itemName>
            <quantity>3</quantity>
            <price>10</price>
         </item>
         <building>
            <id>1002</id>
            <name>department of psychology</name>
         </building>
         <PICKUP_DATE>2017-01-01</PICKUP_DATE>
      </deliveritem>
   </deliveritemlist>
   <deliveritemlist>
      <deliveritem deliverItemID="10">
         <item>
            <itemName>mango</itemName>
            <quantity>50</quantity>
            <price>5.5</price>
         </item>
         <building>
            <id>1001</id>
            <name>vari hall</name>
         </building>
         <PICKUP_DATE>2018-02-01</PICKUP_DATE>
      </deliveritem>
   </deliveritemlist>
</deliver>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/jerry2.xml',
'
<deliverDeliverAmbrosiaApples>
  <driverList>
    <driver employeeID="101">
      <name>
	<firstName>john</firstName>
	<lastName>smith</lastName>
      </name>
      <driverLicense>1230000001</driverLicense>
    </driver>
    <driver employeeID="104">
      <name>
	<firstName>joan</firstName>
	<lastName>pete</lastName>
      </name>
      <driverLicense>1230000004</driverLicense>
    </driver>
  </driverList>
</deliverDeliverAmbrosiaApples>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/jerry3.xml',
'
<deliverItemList>
  <deliverItem deliverID="1">
    <item>
      <id>1</id>
      <name>apple</name>
      <price>10</price>
    </item>
    <supplier>
      <id>1</id>
      <name>victer inc</name>
    </supplier>
  </deliverItem>
  <deliverItem deliverID="2">
    <item>
      <id>11</id>
      <name>Ambrosia apples</name>
      <price>1500</price>
    </item>
    <supplier>
      <id>1</id>
      <name>victer inc</name>
    </supplier>
  </deliverItem>
  <deliverItem deliverID="10">
    <item>
      <id>2</id>
      <name>mango</name>
      <price>5.5</price>
    </item>
    <supplier>
      <id>2</id>
      <name>univers co</name>
    </supplier>
  </deliverItem>
</deliverItemList>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/kristen5.xml',
'
<shipmentInfo>
  <shipmentList DRIVERID="101">
    <shipment>
      <driverName>smith john</driverName>
      <carLicensePlate>a22b12</carLicensePlate>
      <orderDate>2017-01-01</orderDate>
      <completeDate>2017-01-29</completeDate>
      <status>complete</status>
    </shipment>
  </shipmentList>
  <shipmentList DRIVERID="102">
    <shipment>
      <driverName>do jane</driverName>
      <carLicensePlate>z54h89</carLicensePlate>
      <orderDate>2017-02-03</orderDate>
      <completeDate>2017-02-04</completeDate>
      <status>complete</status>
    </shipment>
    <shipment>
      <driverName>do jane</driverName>
      <carLicensePlate>z54h89</carLicensePlate>
      <orderDate>2017-09-27</orderDate>
      <status>need to check</status>
    </shipment>
  </shipmentList>
  <shipmentList DRIVERID="103">
    <shipment>
      <driverName>ngai jack</driverName>
      <carLicensePlate>e09u34</carLicensePlate>
      <orderDate>2017-03-27</orderDate>
      <completeDate>2017-03-29</completeDate>
      <status>complete</status>
    </shipment>
  </shipmentList>
  <shipmentList DRIVERID="104">
    <shipment>
      <driverName>pete joan</driverName>
      <carLicensePlate>a22b12</carLicensePlate>
      <orderDate>2017-05-17</orderDate>
      <completeDate>2017-05-21</completeDate>
      <status>complete</status>
    </shipment>
  </shipmentList>
</shipmentInfo>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/kristen6.xml',
'
<shipmentInfo>
   <shipment count="1">
      <SHIPMENTID>1</SHIPMENTID>
      <DRIVERID>101</DRIVERID>
      <DRIVERNAME>smith john</DRIVERNAME>
      <CARLICENSEPLATE>a22b12</CARLICENSEPLATE>
      <ORDERDATE>1/1/2017 0:0:0</ORDERDATE>
      <COMPLETEDATE>1/29/2017 0:0:0</COMPLETEDATE>
      <STATUS>complete</STATUS>
   </shipment>
   <shipment count="2">
      <SHIPMENTID>2</SHIPMENTID>
      <DRIVERID>102</DRIVERID>
      <DRIVERNAME>do jane</DRIVERNAME>
      <CARLICENSEPLATE>z54h89</CARLICENSEPLATE>
      <ORDERDATE>2/3/2017 0:0:0</ORDERDATE>
      <COMPLETEDATE>2/4/2017 0:0:0</COMPLETEDATE>
      <STATUS>complete</STATUS>
   </shipment>
   <shipment count="3">
      <SHIPMENTID>3</SHIPMENTID>
      <DRIVERID>103</DRIVERID>
      <DRIVERNAME>ngai jack</DRIVERNAME>
      <CARLICENSEPLATE>e09u34</CARLICENSEPLATE>
      <ORDERDATE>3/27/2017 0:0:0</ORDERDATE>
      <COMPLETEDATE>3/29/2017 0:0:0</COMPLETEDATE>
      <STATUS>complete</STATUS>
   </shipment>
   <shipment count="4">
      <SHIPMENTID>4</SHIPMENTID>
      <DRIVERID>104</DRIVERID>
      <DRIVERNAME>pete joan</DRIVERNAME>
      <CARLICENSEPLATE>a22b12</CARLICENSEPLATE>
      <ORDERDATE>5/17/2017 0:0:0</ORDERDATE>
      <COMPLETEDATE>5/21/2017 0:0:0</COMPLETEDATE>
      <STATUS>complete</STATUS>
   </shipment>
   <shipment count="5">
      <SHIPMENTID>5</SHIPMENTID>
      <DRIVERID>102</DRIVERID>
      <DRIVERNAME>do jane</DRIVERNAME>
      <CARLICENSEPLATE>z54h89</CARLICENSEPLATE>
      <ORDERDATE>9/27/2017 0:0:0</ORDERDATE>
      <STATUS>need to check</STATUS>
   </shipment>
</shipmentInfo>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/kristen8.xml',
'
<employee>
  <manager>
    <personalInfo>
      <managerID>301</managerID>
      <firstName>apple</firstName>
      <lastName>yi</lastName>
      <birthday>1988-07-27</birthday>
    </personalInfo>
    <personalInfo>
      <managerID>302</managerID>
      <firstName>ibrahim</firstName>
      <lastName>manjra</lastName>
      <birthday>1987-10-05</birthday>
    </personalInfo>
    <personalInfo>
      <managerID>303</managerID>
      <firstName>donia</firstName>
      <lastName>zhao</lastName>
      <birthday>1978-03-08</birthday>
    </personalInfo>
  </manager>
</employee>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/eva1.xml',
'
<availableCars>
  <shipmentUsed SID="1">
    <cars>
    <ID>1</ID>
    <plateNumber>a22b12</plateNumber>
    <type>medium</type>
    </cars>
  </shipmentUsed>
  <shipmentUsed SID="3">
    <cars>
    <ID>3</ID>
    <plateNumber>e09u34</plateNumber>
    <type>small</type>
    </cars>
  </shipmentUsed>
  <shipmentUsed SID="4">
    <cars>
    <ID>1</ID>
    <plateNumber>a22b12</plateNumber>
    <type>medium</type>
    </cars>
  </shipmentUsed>
</availableCars>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/eva2.xml',
'
<building1001>
  <inventory>
    <fruits>
      <ID>4</ID>
      <name>banana</name>
      <price>10.6</price>
    </fruits>
    <fruits>
      <ID>1</ID>
      <name>apple</name>
      <price>10</price>
    </fruits>
    <fruits>
      <ID>2</ID>
      <name>mango</name>
      <price>5.5</price>
    </fruits>
  </inventory>
</building1001>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/eva111.xml',
'
<shipment1>
   <employee>
      <ID>101</ID>
      <driver num = "1">
          <FIRSTNAME>john</FIRSTNAME>
          <LASTNAME>smith</LASTNAME>
      </driver>
   </employee>
   <employee>
      <ID>102</ID>
      <driver num = "2">
          <FIRSTNAME>jane</FIRSTNAME>
          <LASTNAME>do</LASTNAME>
      </driver>
   </employee>
</shipment1>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/eva2222.xml',
'
<inventory>
  <fruits>
    <ID>4</ID>
    <name>banana</name>
    <num>1</num>
  </fruits>
  <fruits>
    <ID>8</ID>
    <name>salak</name>
    <num>2</num>
  </fruits>
</inventory>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/effy13.xml',
'
<inventoryInfo>
  <inventoryList BUILDINGID="1001">
    <inventory>
      <id>1</id>
      <name>apple</name>
      <price>10</price>
      <quantity>31</quantity>
      <buildingID>1001</buildingID>
      <buildingName>vari hall</buildingName>
      <CHECKIN_DATE>1987-10-05</CHECKIN_DATE>
      <CHECKOUT_DATE>1987-10-05</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>10</id>
      <name>yuzu</name>
      <price>810.5</price>
      <quantity>43</quantity>
      <buildingID>1001</buildingID>
      <buildingName>vari hall</buildingName>
      <CHECKIN_DATE>2010-09-01</CHECKIN_DATE>
      <CHECKOUT_DATE>2010-09-24</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>11</id>
      <name>Ambrosia apples</name>
      <price>1500</price>
      <quantity>43</quantity>
      <buildingID>1001</buildingID>
      <buildingName>vari hall</buildingName>
      <CHECKIN_DATE>2010-09-01</CHECKIN_DATE>
      <CHECKOUT_DATE>2010-09-24</CHECKOUT_DATE>
    </inventory>
  </inventoryList>
  <inventoryList BUILDINGID="1002">
    <inventory>
      <id>2</id>
      <name>mango</name>
      <price>5.5</price>
      <quantity>964</quantity>
      <buildingID>1002</buildingID>
      <buildingName>department of psychology</buildingName>
      <CHECKIN_DATE>2010-01-06</CHECKIN_DATE>
      <CHECKOUT_DATE>2010-01-06</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>7</id>
      <name>lychee</name>
      <price>44.5</price>
      <quantity>100</quantity>
      <buildingID>1002</buildingID>
      <buildingName>department of psychology</buildingName>
      <CHECKIN_DATE>2010-10-25</CHECKIN_DATE>
      <CHECKOUT_DATE>2010-10-25</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>1</id>
      <name>apple</name>
      <price>10</price>
      <quantity>1043</quantity>
      <buildingID>1002</buildingID>
      <buildingName>department of psychology</buildingName>
      <CHECKIN_DATE>2010-09-01</CHECKIN_DATE>
      <CHECKOUT_DATE>2010-09-24</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>3</id>
      <name>miracle fruit</name>
      <price>8.6</price>
      <quantity>75</quantity>
      <buildingID>1002</buildingID>
      <buildingName>department of psychology</buildingName>
      <CHECKIN_DATE>1987-10-27</CHECKIN_DATE>
      <CHECKOUT_DATE>1987-10-27</CHECKOUT_DATE>
    </inventory>
  </inventoryList>
  <inventoryList BUILDINGID="1003">
    <inventory>
      <id>4</id>
      <name>banana</name>
      <price>10.6</price>
      <quantity>3</quantity>
      <buildingID>1003</buildingID>
      <buildingName>ikea vaughan</buildingName>
      <CHECKIN_DATE>1987-10-16</CHECKIN_DATE>
      <CHECKOUT_DATE>1987-10-16</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>9</id>
      <name>kiwifruit</name>
      <price>18.9</price>
      <quantity>13</quantity>
      <buildingID>1003</buildingID>
      <buildingName>ikea vaughan</buildingName>
      <CHECKIN_DATE>2010-06-21</CHECKIN_DATE>
      <CHECKOUT_DATE>2010-06-21</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>4</id>
      <name>banana</name>
      <price>10.6</price>
      <quantity>3</quantity>
      <buildingID>1003</buildingID>
      <buildingName>ikea vaughan</buildingName>
      <CHECKIN_DATE>2017-10-16</CHECKIN_DATE>
      <CHECKOUT_DATE>2017-10-19</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>6</id>
      <name>plum</name>
      <price>40.5</price>
      <quantity>30</quantity>
      <buildingID>1003</buildingID>
      <buildingName>ikea vaughan</buildingName>
      <CHECKIN_DATE>2000-10-05</CHECKIN_DATE>
      <CHECKOUT_DATE>2000-10-05</CHECKOUT_DATE>
    </inventory>
  </inventoryList>
  <inventoryList BUILDINGID="1004">
    <inventory>
      <id>5</id>
      <name>coconut</name>
      <price>100.5</price>
      <quantity>73</quantity>
      <buildingID>1004</buildingID>
      <buildingName>walmart toronto downsview</buildingName>
      <CHECKIN_DATE>2001-10-21</CHECKIN_DATE>
      <CHECKOUT_DATE>2001-10-21</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>8</id>
      <name>salak</name>
      <price>213.15</price>
      <quantity>1</quantity>
      <buildingID>1004</buildingID>
      <buildingName>walmart toronto downsview</buildingName>
      <CHECKIN_DATE>2010-10-21</CHECKIN_DATE>
      <CHECKOUT_DATE>2010-10-21</CHECKOUT_DATE>
    </inventory>
    <inventory>
      <id>1</id>
      <name>apple</name>
      <price>10</price>
      <quantity>43</quantity>
      <buildingID>1004</buildingID>
      <buildingName>walmart toronto downsview</buildingName>
      <CHECKIN_DATE>2010-09-01</CHECKIN_DATE>
      <CHECKOUT_DATE>2010-09-24</CHECKOUT_DATE>
    </inventory>
  </inventoryList>
</inventoryInfo>
'
);
commit;
end;
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/effy14.xml',
'
<itemInfo>
  <itemList SUPPLIERID="1">
    <item>
      <id>1</id>
      <name>apple</name>
      <price>10</price>
      <supplierName>victer inc</supplierName>
      <supplierID>1</supplierID>
    </item>
    <item>
      <id>3</id>
      <name>miracle fruit</name>
      <price>8.6</price>
      <supplierName>victer inc</supplierName>
      <supplierID>1</supplierID>
    </item>
    <item>
      <id>11</id>
      <name>Ambrosia apples</name>
      <price>1500</price>
      <supplierName>victer inc</supplierName>
      <supplierID>1</supplierID>
    </item>
    <item>
      <id>7</id>
      <name>lychee</name>
      <price>44.5</price>
      <supplierName>victer inc</supplierName>
      <supplierID>1</supplierID>
    </item>
  </itemList>
  <itemList SUPPLIERID="2">
    <item>
      <id>2</id>
      <name>mango</name>
      <price>5.5</price>
      <supplierName>univers co</supplierName>
      <supplierID>2</supplierID>
    </item>
  </itemList>
  <itemList SUPPLIERID="3">
    <item>
      <id>4</id>
      <name>banana</name>
      <price>10.6</price>
      <supplierName>logi inc</supplierName>
      <supplierID>3</supplierID>
    </item>
    <item>
      <id>10</id>
      <name>yuzu</name>
      <price>810.5</price>
      <supplierName>logi inc</supplierName>
      <supplierID>3</supplierID>
    </item>
    <item>
      <id>9</id>
      <name>kiwifruit</name>
      <price>18.9</price>
      <supplierName>logi inc</supplierName>
      <supplierID>3</supplierID>
    </item>
    <item>
      <id>8</id>
      <name>salak</name>
      <price>213.15</price>
      <supplierName>logi inc</supplierName>
      <supplierID>3</supplierID>
    </item>
  </itemList>
  <itemList SUPPLIERID="4">
    <item>
      <id>5</id>
      <name>coconut</name>
      <price>100.5</price>
      <supplierName>canand inc</supplierName>
      <supplierID>4</supplierID>
    </item>
    <item>
      <id>6</id>
      <name>plum</name>
      <price>40.5</price>
      <supplierName>canand inc</supplierName>
      <supplierID>4</supplierID>
    </item>
  </itemList>
</itemInfo>
'
);
commit;
end;
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/effy15.xml',
'
<trackingShipment>
  <shipmentInfo>
    <shipment>
      <shipmentID>1</shipmentID>
      <clerkName>anna banana</clerkName>
      <driverName>smith john</driverName>
      <platenumber>a22b12</platenumber>
      <carType>medium</carType>
      <ORDER_DATE>2017-01-01</ORDER_DATE>
      <COMPLETE_DATE>2017-01-29</COMPLETE_DATE>
    </shipment>
    <shipment>
      <shipmentID>2</shipmentID>
      <clerkName>brian cu</clerkName>
      <driverName>do jane</driverName>
      <platenumber>z54h89</platenumber>
      <carType>medium</carType>
      <ORDER_DATE>2017-02-03</ORDER_DATE>
      <COMPLETE_DATE>2017-02-04</COMPLETE_DATE>
    </shipment>
    <shipment>
      <shipmentID>3</shipmentID>
      <clerkName>colleen douglas</clerkName>
      <driverName>ngai jack</driverName>
      <platenumber>e09u34</platenumber>
      <carType>small</carType>
      <ORDER_DATE>2017-03-27</ORDER_DATE>
      <COMPLETE_DATE>2017-03-29</COMPLETE_DATE>
    </shipment>
    <shipment>
      <shipmentID>4</shipmentID>
      <clerkName>david esposito</clerkName>
      <driverName>pete joan</driverName>
      <platenumber>a22b12</platenumber>
      <carType>medium</carType>
      <ORDER_DATE>2017-05-17</ORDER_DATE>
      <COMPLETE_DATE>2017-05-21</COMPLETE_DATE>
    </shipment>
    <shipment>
      <shipmentID>5</shipmentID>
      <clerkName>anna banana</clerkName>
      <driverName>do jane</driverName>
      <platenumber>z54h89</platenumber>
      <carType>medium</carType>
      <ORDER_DATE>2017-09-27</ORDER_DATE>
    </shipment>
  </shipmentInfo>
</trackingShipment>
'
);
commit;
end;
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/peter1.xml',
'
<inventory>
  <Item CHECKINDATE="1987-10-05">
    <Info>
      <itemName>apple</itemName>
      <itemPrice>10</itemPrice>
      <quantity>31</quantity>
    </Info>
  </Item>
  <Item CHECKINDATE="2010-09-01">
    <Info>
      <itemName>yuzu</itemName>
      <itemPrice>810.5</itemPrice>
      <quantity>43</quantity>
    </Info>
    <Info>
      <itemName>Ambrosia apples</itemName>
      <itemPrice>1500</itemPrice>
      <quantity>43</quantity>
    </Info>
  </Item>
</inventory>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/peter2.xml',
'
<ITEMID>6</ITEMID>
<ITEMPRICE>40.5</ITEMPRICE>
<NAME>plum</NAME>
'
);
commit; 
end; 
/

declare 
ret boolean;
begin 
ret := dbms_xdb.createresource('/public/myfolder2/peter4.xml',
'
<Supplier>
  <item>
    <information>
      <ID>1</ID>
      <Name>apple</Name>
      <price>10</price>
    </information>
    <information>
      <ID>3</ID>
      <Name>miracle fruit</Name>
      <price>8.6</price>
    </information>
    <information>
      <ID>7</ID>
      <Name>lychee</Name>
      <price>44.5</price>
    </information>
    <information>
      <ID>11</ID>
      <Name>Ambrosia apples</Name>
      <price>1500</price>
    </information>
  </item>
</Supplier>
'
);
commit; 
end; 
/

---------------------------------------
---------------------------------------
---------- XQuery Statement  ----------
---------------------------------------
---------------------------------------

--[Jerry Part]
--x1.conditions specified on elements
--get the item information that the price more than 6 form xml file
xquery
let $d := doc("/public/myfolder2/jerry1.xml")
for $e in $d/deliver/deliveritemlist/deliveritem
where $e/item/price > 6
return <item><name>{$e/item/itemName/text()}</name><price>{$e/item/price/text()}</price></item>
/

--x2.conditions specified on attribute
--get the item informaton that the deliverItemID more than 1 form xml file
xquery
let $d := doc("/public/myfolder2/jerry1.xml")
for $e in $d/deliver/deliveritemlist/deliveritem
where $e/@deliverItemID > 1
return element item {element name {$e/item/itemName/text()},element price {$e/item/price/text()}}
/

--x3.xquery two xml file & return values without XML tags
--get the item name and supper name form 2 xml
xquery
let $d:=doc('/public/myfolder2/jerry1.xml')
for $e in $d/deliver/deliveritemlist/deliveritem
let $d2:=doc('/public/myfolder2/jerry3.xml')
for $e2 in $d2/deliverItemList/deliverItem
where $e/item/itemName=$e2/item/name
return concat('The selected item name is ',string($e/item/itemName/text()),',and the supplier is ',string($e2/supplier/name/text()),'.')
/

--[Kristen Part]
--x4.conditions specified on elements 
xquery
let $d := doc("/public/myfolder2/kristen5.xml")
for $e in $d/shipmentInfo/shipmentList
where $e/shipment/status = 'complete'
return <shipment><driverName>{$e/shipment/driverName/text()}</driverName><carLicensePlate>{$e/shipment/carLicensePlate/text()}</carLicensePlate><completeDate>{$e/shipment/completeDate/text()}</completeDate></shipment>
/

--x5.conditions specified on attribute 
xquery
let $d := doc("/public/myfolder2/kristen5.xml")
for $e in $d/shipmentInfo/shipmentList
where $e/@DRIVERID > 100
return element shipment {element driverName {$e/shipment/driverName/text()},element carLicensePlate {$e/shipment/carLicensePlate/text()}}
/

--x6.xquery two xml file & return values without XML tags
xquery
let $d:=doc('/public/myfolder2/kristen5.xml')
for $e in $d/shipmentInfo/shipmentList/shipment
let $d2:=doc('/public/myfolder2/kristen6.xml')
for $e2 in $d2/shipmentInfo/shipment
where $e/driverName=$e2/DRIVERNAME
return concat('The selected driver name is ',string($e/driverName/text()),', and car license plate is ',string($e/carLicensePlate/text()),'.')
/

--x7.conditions specified on elements 
xquery
let $d := doc("/public/myfolder2/eva2.xml")
for $e in $d/building1001/inventory/fruits
where $e/name = 'mango'
return <item><name>{$e/name/text()}</name><price>{$e/price/text()}</price></item>
/

--x8.conditions specified on attribute 
xquery
let $d := doc("/public/myfolder2/eva1.xml")
for $e in $d/availableCars/shipmentUsed
where $e/@SID = 1
return element item {element ID {$e/cars/ID/text()}, element plateNumber {$e/cars/plateNumber/text()}, element type {$e/cars/type/text()}}
/

--x9.xquery two xml file & return values without XML tags
xquery
let $c := doc("/public/myfolder2/eva111.xml")
for $d in $c/shipment1/employee[ID = 101]
let $s := doc("/public/myfolder2/eva2222.xml")
for $e in $s/inventory/fruits
where $d/driver/@num = $e/num
return $e/name/text()
/

--x10.conditions specified on elements
--List the clerk, driver, plate number information which has shipment ID greater than 2 
xquery
let $c :=doc("/public/myfolder2/effy15.xml")
for $d in $c/trackingShipment/shipmentInfo
where $d/shipment/shipmentID >2
return <shipment><clerkName>{$d/shipment/clerkName/text()}</clerkName>
<driverName>{$d/shipment/driverName/text()}</driverName>
<platenumber>{$d/shipment/platenumber/text()}</platenumber>
</shipment>
/

--x11.conditions specified on tag attributes
--Display the inventory name, price, and quantity stored in buidling ID 1003
xquery 
let $d :=doc("/public/myfolder2/effy13.xml")
for $e in $d/inventoryInfo/inventoryList
where $e/@BUILDINGID = 1003
return element inventory {element name {$e/inventory/name/text()},element price 
{$e/inventory/price/text()},element quantity {$e/inventory/quantity/text()}}
/

--x12.xquery two xml file & return values without XML tags
--Display the item name and price with its associated supplier.
xquery
let $d :=doc("/public/myfolder2/effy13.xml")
for $e in $d/inventoryInfo/inventoryList/inventory
let $d2 :=doc("/public/myfolder2/effy14.xml")
for $e2 in $d2/itemInfo/itemList/item
where $e/name = $e2/name 
return concat ('The item name is ', string($e2/name/text()),', price is $ ', string
($e/price/text()),', and the supplier is ',string($e2/supplierName/text()),'.')
/

--x13.conditions specified on elements 
xquery
let $d := doc("/public/myfolder2/peter1.xml")
for $e in $d/inventory/Item/Info
where $e/itemPrice > 9
return <item><name>{$e/itemName/text()}</name><quantity>($e/quantity/text())</quantity></item>
/

--x14.conditions specified on attribute 
xquery
let $d := doc("/public/myfolder2/peter1.xml")
for $e in $d/inventory/Item
where $e/@CHECKINDATE ="1987-10-05"
return element item {element name {$e/Info/itemName/text()},element quantity {$e/Info/quantity/text()}}
/

--x15.xquery two xml file & return values without XML tags
xquery
let $d:=doc('/public/myfolder2/peter1.xml')
for $e in $d/inventory/Item/Info
let $d2:=doc('/public/myfolder2/peter4.xml')
for $e2 in $d2/Supplier/item/information
where $e/itemName=$e2/Name
return concat('The selected item name is ',string($e/itemName/text()),',and quantity is $',string($e/quantity/text()),'.')
/